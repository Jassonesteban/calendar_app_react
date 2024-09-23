import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns';
import { localizer } from '../../helpers/calendarLocalizer'

import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { getMessagesES } from '../../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUIStore } from '../../hooks/useUIStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNewEvent } from '../components/FabAddNewEvent';
import { FabDeleteEvent } from '../components/FabDeleteEvent';
import { UseAuthStoreCopy } from '../../hooks/UseAuthStoreCopy';


export const CalendarPage = () => {

  const {user} = UseAuthStoreCopy();
  const { openDateModal } = useUIStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);



    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setlastView(event);
  }

  useEffect(() => {
    startLoadingEvents()
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}

        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNewEvent />
      <FabDeleteEvent />
    </>
  )
}
