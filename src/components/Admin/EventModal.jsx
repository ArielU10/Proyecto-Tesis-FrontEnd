import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaEdit, FaTrash, FaCalendarCheck } from 'react-icons/fa';

const EventModal = ({
  mode, // 'create', 'view', 'edit'
  selectedDate,
  selectedEvent,
  events,
  onCreateEvent,
  onEditEvent,
  onDeleteEvent,
  onEditClick,
  onClose
}) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'recordatorio'
  });

  // Tipos de eventos disponibles
  const eventTypes = [
    { value: 'reunion', label: 'Reunión', color: 'blue' },
    { value: 'recordatorio', label: 'Recordatorio', color: 'green' },
    { value: 'aviso', label: 'Aviso', color: 'orange' },
    { value: 'urgente', label: 'Urgente', color: 'red' }
  ];

  // Cargar datos del evento seleccionado al editar
  useEffect(() => {
    if (mode === 'edit' && selectedEvent) {
      setFormData({
        titulo: selectedEvent.titulo,
        descripcion: selectedEvent.descripcion,
        tipo: selectedEvent.tipo || 'recordatorio'
      });
    } else if (mode === 'create') {
      setFormData({
        titulo: '',
        descripcion: '',
        tipo: 'recordatorio'
      });
    }
  }, [mode, selectedEvent]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }

    if (mode === 'create') {
      onCreateEvent(formData);
    } else if (mode === 'edit') {
      onEditEvent(formData);
    }
  };

  // Formatear fecha para mostrar
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Fecha no válida';
    
    try {
      const date = new Date(dateString + 'T00:00:00');
      if (isNaN(date.getTime())) return 'Fecha no válida';
      
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha no válida';
    }
  };

  // Obtener color del tipo de evento
  const getEventTypeColor = (tipo) => {
    const eventType = eventTypes.find(type => type.value === tipo);
    return eventType ? eventType.color : 'default';
  };

  return (
    <div className="event-modal-backdrop" onClick={onClose}>
      <div className="event-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header del modal */}
        <div className="event-modal-header">
          <div className="modal-title">
            <FaCalendarCheck className="modal-icon" />
            <h3>
              {mode === 'create' && 'Crear Evento'}
              {mode === 'view' && `Eventos - ${formatDisplayDate(selectedDate)}`}
              {mode === 'edit' && 'Editar Evento'}
            </h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="event-modal-content">
          
          {/* Vista de eventos existentes */}
          {mode === 'view' && (
            <div className="events-view">
              <div className="events-list">
                {events.map(event => (
                  <div key={event.id} className={`event-item event-${event.tipo || 'default'}`}>
                    <div className="event-info">
                      <h4>{event.titulo}</h4>
                      <p>{event.descripcion}</p>
                      <span className="event-type">
                        {eventTypes.find(type => type.value === event.tipo)?.label || 'Sin categoría'}
                      </span>
                    </div>
                    <div className="event-actions">
                      <button 
                        className="edit-event-btn"
                        onClick={() => onEditClick(event)}
                        title="Editar evento"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="delete-event-btn"
                        onClick={() => {
                          if (window.confirm('¿Estás seguro de eliminar este evento?')) {
                            onDeleteEvent(event.id);
                          }
                        }}
                        title="Eliminar evento"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                className="add-event-btn"
                onClick={() => {
                  // Cambiar a modo crear sin cerrar el modal
                  setFormData({ titulo: '', descripcion: '', tipo: 'recordatorio' });
                  // Usar una prop callback para cambiar el modo desde el componente padre
                  if (onEditClick) {
                    onEditClick({ mode: 'create' });
                  }
                }}
              >
                <FaPlus /> Agregar Evento
              </button>
            </div>
          )}

          {/* Formulario de creación/edición */}
          {(mode === 'create' || mode === 'edit') && (
            <form onSubmit={handleSubmit} className="event-form">
              
              {/* Fecha seleccionada */}
              <div className="form-group">
                <label>Fecha:</label>
                <div className="selected-date">
                  {formatDisplayDate(selectedDate)}
                </div>
              </div>

              {/* Título */}
              <div className="form-group">
                <label htmlFor="titulo">Título *</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ej: Reunión de padres"
                  required
                />
              </div>

              {/* Tipo de evento */}
              <div className="form-group">
                <label htmlFor="tipo">Tipo de evento</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descripción */}
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción del evento (opcional)"
                  rows="3"
                />
              </div>

              {/* Botones de acción */}
              <div className="form-actions">
                <button type="button" className="cancel-btn3" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="submit-btn3">
                  {mode === 'create' ? 'Crear Evento' : 'Guardar Cambios'}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default EventModal;