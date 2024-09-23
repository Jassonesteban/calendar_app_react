import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarAPI from '../api/calendarAPI';
import { convertsDataToEvent } from '../helpers/convertsDataToEvent';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {

    try {
      if (calendarEvent.id) {

        await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //creando el evento
      const { data } = await calendarAPI.post('/events/create', calendarEvent);

      console.log(data);

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventoGuardado.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al actualizar', error.response.data.msg, 'error');
    }
  }

  const startDeletingEvent = async() => {

    try {
      await calendarAPI.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarAPI.get('/events/get');
      const events = convertsDataToEvent(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  }


  return {
    activeEvent,
    events,
    HasEventSelected: !!activeEvent,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
