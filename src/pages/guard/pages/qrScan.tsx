import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../../context/AuthContext'
import { Camera, QrCode, AlertCircle, CheckCircle } from 'lucide-react'

const QRScan = () => {
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [scanned, setScanned] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const qrRef = useRef<HTMLDivElement>(null)
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null)
    const navigate = useNavigate()
    const { user } = useAuth();

    useEffect(() => {
        const qrRegionId = 'qr-reader'

        const tryStartScanner = async () => {
            if (!qrRef.current) {
                setError('Elemento del escáner no disponible')
                setIsLoading(false)
                return
            }

            const html5QrCode = new Html5Qrcode(qrRegionId)
            html5QrCodeRef.current = html5QrCode

            try {
                const devices = await Html5Qrcode.getCameras()
                if (!devices.length) {
                    setError('No se detectaron cámaras disponibles.')
                    setIsLoading(false)
                    return
                }

                const cameraId = devices[0].id

                if (qrRef.current.clientWidth === 0) {
                    setError('El contenedor QR aún no está visible. Esperando...')
                    setIsLoading(false)
                    return
                }

                startScanner(cameraId, html5QrCode)
            } catch (err) {
                console.error(err)
                setError('Error accediendo a la cámara.')
                setIsLoading(false)
            }
        }

        setTimeout(tryStartScanner, 200)

        return () => {
            if (html5QrCodeRef.current) {
                html5QrCodeRef.current.stop().catch(() => { })
            }
        }
    }, [])

    const startScanner = (cameraId: string, html5QrCode: Html5Qrcode) => {
        html5QrCode.start(
            cameraId,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            async (decodedText) => {
                if (scanned) return
                setScanned(true)
                setIsLoading(false)

                const token = extractToken(decodedText)
                if (!token) {
                    handleError('QR inválido o sin token')
                    return
                }

                try {
                    console.log('Token de usuario enviado al backend:', user?.token)
                    const response = await axios.get(
                        `http://localhost:3000/api/guards/qr-token/${token}/validate`,
                        {
                            headers: {
                                Authorization: `Bearer ${user?.token}`,
                            },
                        }
                    )

                    if (response.data.valid) {
                        setSuccessMessage('QR válido. Redirigiendo...')
                        await html5QrCode.stop()
                        setTimeout(() => navigate(`/guard/student/${token}`, {
                            state: { student: response.data.student }
                        }), 1500)
                    } else {
                        handleError('QR inválido o estudiante no encontrado')
                    }
                } catch (err: any) {
                    handleError(err.response?.data?.message || 'Error validando QR')
                }
            },
            () => {
                // Escaneo fallido silenciosamente
                setIsLoading(false)
            }
        )
    }

    const extractToken = (data: string): string | null => {
        try {
            if (data.includes('token=')) {
                const url = new URL(data)
                return url.searchParams.get('token')
            }
            if (data.length > 10) return data
        } catch {
            return null
        }
        return null
    }

    const handleError = async (msg: string) => {
        setError(msg)
        setIsLoading(false)
        if (html5QrCodeRef.current) {
            await html5QrCodeRef.current.stop()
        }

        setTimeout(() => {
            setError(null)
            setScanned(false)
            setIsLoading(true)

            Html5Qrcode.getCameras().then((devices) => {
                if (devices.length > 0 && html5QrCodeRef.current) {
                    startScanner(devices[0].id, html5QrCodeRef.current)
                }
            })
        }, 3000)
    }

    return (
        <div className="qr-scan-page">
            <div className="qr-scan-header">
                <h2 className="qr-scan-title">Escanear Código QR</h2>
                <p className="qr-scan-subtitle">
                    Apunta la cámara hacia el código QR del estudiante
                </p>
            </div>

            <div className="qr-scanner-container">
                <div className="qr-reader-wrapper">
                    <div ref={qrRef} id="qr-reader" />

                    {!error && !successMessage && (
                        <div className="scanner-overlay">
                            <div className="scanner-frame">
                                <div className="scanner-corners"></div>
                                <div className="scan-line"></div>
                            </div>
                        </div>
                    )}

                    {isLoading && !error && !successMessage && (
                        <div className="scanner-loading">
                            <div className="loading-spinner"></div>
                            <p className="loading-text">Iniciando cámara...</p>
                        </div>
                    )}
                </div>

                <div className="scan-instructions">
                    <h3 className="scan-instructions-title">
                        <Camera className="w-5 h-5 inline mr-2" />
                        Instrucciones
                    </h3>
                    <p className="scan-instructions-text">
                        Mantén el código QR dentro del marco y espera a que se escanee automáticamente
                    </p>
                </div>

                {error && (
                    <div className="alert-error">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="alert-success">
                        <CheckCircle className="w-5 h-5" />
                        <span>{successMessage}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default QRScan