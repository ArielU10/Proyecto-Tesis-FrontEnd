/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const StudentDetails = () => {
    const location = useLocation()
    const params = useParams()
    const [student, setStudent] = useState(location.state?.student || null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state?.student) {
            setStudent(location.state.student)
            setLoading(false)
            return
        }
        if (params.token && !student) {
            loadStudentData(params.token)
        } else if (!params.token) {
            setError('No se encontró información del estudiante.')
            setLoading(false)
        }
    }, [location.state?.student, params.token, student])

    const loadStudentData = async (token) => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await axios.get(
                `http://localhost:3000/api/guards/qr-token/${token}/validate`,
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            )

            if (response.data.valid && response.data.student) {
                setStudent(response.data.student)
            } else {
                setError('No se pudo validar la información del estudiante.')
            }
        } catch (err) {
            console.error('Error loading student data:', err)
            const errorMessage = err.response?.data?.message || 'Error cargando información del estudiante.'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleGoBack = () => {
        navigate('/guard', { replace: true })
    }

    if (loading) {
        return (
            <div className="guard-content-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Validando información del estudiante...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="guard-content-container">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h2 className="error-title">Error de Validación</h2>
                    <p className="error-message">{error}</p>
                    <button className="guard-button" onClick={handleGoBack}>
                        <span>←</span>
                        Volver
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="guard-content-container">
            <div className="status-badge success">
                <span className="status-icon">✓</span>
                <span className="status-text">Estudiante Autorizado</span>
            </div>

            <div className="student-card">
                <div className="student-header">
                    <div className="student-avatar">
                        <span className="avatar-text">
                            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </span>
                    </div>
                    <div className="student-info-card">
                        <h2 className="student-name-card">
                            {student.firstName} {student.lastName}
                        </h2>
                        <p className="student-course">
                            {student.Course.courseName} - {student.Course.description}
                        </p>
                    </div>
                </div>

                <div className="details-section">
                    <h3 className="section-title">Información del Estudiante</h3>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Nombre Completo:</span>
                            <span className="detail-value">{student.firstName} {student.lastName}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Curso:</span>
                            <span className="detail-value">{student.Course.courseName}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Paralelo:</span>
                            <span className="detail-value">{student.Course.description}</span>
                        </div>
                    </div>
                </div>

                <div className="details-section">
                    <h3 className="section-title">Representante Legal</h3>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Nombre:</span>
                            <span className="detail-value">
                                {student.LegalRepresentative.firstName} {student.LegalRepresentative.lastName}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Teléfono:</span>
                            <span className="detail-value phone-number">
                                {student.LegalRepresentative.phone}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="guard-button secondary" onClick={handleGoBack}>
                        <span>←</span>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StudentDetails