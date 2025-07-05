import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { useLocation } from 'react-router-dom'

const StudentDetails = () => {
    const location = useLocation()
    const [student, setStudent] = useState<any>(location.state?.student || null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (student) {
            setLoading(false)
        } else {
            setError('No se pudo cargar la información del estudiante.')
        }
    }, [student])

    const handleGoBack = () => {
        navigate(-1)
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
            {/* Status Badge */}
            <div className="status-badge success">
                <span className="status-icon">✓</span>
                <span className="status-text">Estudiante Autorizado</span>
            </div>

            {/* Student Card */}
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

                {/* Student Details */}
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

                {/* Legal Representative Details */}
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

                {/* Action Buttons */}
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