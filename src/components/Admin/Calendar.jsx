import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaPlus, FaTimes } from 'react-icons/fa';
import EventModal from './EventModal';
import '../../styles/components/calendar.css';


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'view', 'edit'

  // Obtener información del mes actual
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Cargar eventos del localStorage al inicializar
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('calendarEvents');
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents);
        if (Array.isArray(parsedEvents)) {
          setEvents(parsedEvents);
        }
      }
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
      setEvents([]);
    }
  }, []);

  // Guardar eventos en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [events]);

  // Obtener primer día del mes y cantidad de días
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Navegar entre meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Formatear fecha a string YYYY-MM-DD
  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Obtener eventos para una fecha específica
  const getEventsForDay = (day, month, year) => {
    if (!day || month === undefined || !year || !Array.isArray(events)) {
      return [];
    }
    
    try {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return events.filter(event => event && event.fecha === dateString);
    } catch (error) {
      console.error('Error getting events for day:', error);
      return [];
    }
  };

  // Manejar click en un día
  const handleDayClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    
    const clickedDate = new Date(currentYear, currentMonth, day);
    const dateString = formatDateToString(clickedDate);
    const dayEvents = getEventsForDay(day, currentMonth, currentYear);
    
    setSelectedDate(dateString);
    
    if (dayEvents.length > 0) {
      // Si hay eventos, mostrar vista de eventos
      setModalMode('view');
      setSelectedEvent(null);
    } else {
      // Si no hay eventos, abrir creación
      setModalMode('create');
      setSelectedEvent(null);
    }
    
    setIsModalOpen(true);
  };

  // Crear evento
  const handleCreateEvent = (eventData) => {
    if (!eventData || !selectedDate) {
      console.error('Missing event data or selected date');
      return;
    }

    try {
      const newEvent = {
        id: Date.now(),
        ...eventData,
        fecha: selectedDate
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // Editar evento
  const handleEditEvent = (eventData) => {
    if (!eventData || !selectedEvent || !selectedEvent.id) {
      console.error('Missing event data or selected event');
      return;
    }

    try {
      setEvents(prevEvents => prevEvents.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...eventData }
          : event
      ));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  // Eliminar evento
  const handleDeleteEvent = (eventId) => {
    if (!eventId) {
      console.error('Missing event ID');
      return;
    }

    try {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Abrir modal de edición
  const handleEditClick = (event) => {
    // Si se pasa un objeto con mode, cambiar el modo
    if (event && event.mode === 'create') {
      setModalMode('create');
      setSelectedEvent(null);
      return;
    }
    
    // Lógica normal para editar evento
    setSelectedEvent(event);
    setModalMode('edit');
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  // Generar días del calendario
  const generateCalendarDays = () => {
    const days = [];

    try {
      // Días del mes anterior
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const dayEvents = getEventsForDay(day, prevMonth, prevYear);
        
        days.push({
          day: day,
          isCurrentMonth: false,
          isToday: false,
          events: dayEvents || [],
          month: prevMonth,
          year: prevYear
        });
      }

      // Días del mes actual
      for (let day = 1; day <= daysInMonth; day++) {
        const isToday = 
          today.getDate() === day &&
          today.getMonth() === currentMonth &&
          today.getFullYear() === currentYear;

        const dayEvents = getEventsForDay(day, currentMonth, currentYear);

        days.push({
          day: day,
          isCurrentMonth: true,
          isToday: isToday,
          events: dayEvents || [],
          month: currentMonth,
          year: currentYear
        });
      }

      // Días del próximo mes para completar la grilla
      const remainingDays = 42 - days.length;
      for (let day = 1; day <= remainingDays; day++) {
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const dayEvents = getEventsForDay(day, nextMonth, nextYear);
        
        days.push({
          day: day,
          isCurrentMonth: false,
          isToday: false,
          events: dayEvents || [],
          month: nextMonth,
          year: nextYear
        });
      }
    } catch (error) {
      console.error('Error generating calendar days:', error);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-container">
      {/* Header del calendario */}
      <div className="calendar-header">
        <div className="calendar-title">
          <FaCalendarAlt className="calendar-icon" />
          <h3>Agenda de Comunicados y Eventos</h3>
        </div>
        <button className="today-btn" onClick={goToToday}>
          Hoy
        </button>
      </div>

      {/* Navegación del mes */}
      <div className="calendar-nav">
        <button className="nav-btn" onClick={goToPreviousMonth}>
          <FaChevronLeft />
        </button>
        <h4 className="month-year">
          {monthNames[currentMonth]} {currentYear}
        </h4>
        <button className="nav-btn" onClick={goToNextMonth}>
          <FaChevronRight />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="calendar-weekdays">
        {dayNames.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Grilla de días */}
      <div className="calendar-grid">
        {calendarDays.map((dayObj, index) => (
          <div
            key={index}
            className={`calendar-day ${
              !dayObj.isCurrentMonth ? 'other-month' : ''
            } ${dayObj.isToday ? 'today' : ''} ${
              dayObj.events.length > 0 ? 'has-events' : ''
            }`}
            onClick={() => handleDayClick(dayObj.day, dayObj.isCurrentMonth)}
          >
            <span className="day-number">{dayObj.day}</span>
            {dayObj.events.length > 0 && (
              <div className="event-indicators">
                {dayObj.events.length <= 3 ? (
                  dayObj.events.map((event, idx) => (
                    <div key={idx} className={`event-dot event-${event.tipo || 'default'}`}></div>
                  ))
                ) : (
                  <>
                    <div className="event-dot event-default"></div>
                    <div className="event-dot event-default"></div>
                    <div className="event-count">+{dayObj.events.length - 2}</div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de eventos */}
      {isModalOpen && (
        <EventModal
          mode={modalMode}
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          events={events.filter(event => event.fecha === selectedDate)}
          onCreateEvent={handleCreateEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onEditClick={handleEditClick}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Calendar;