import React from 'react'
import { useUIStore } from '../../hooks/useUIStore'
import { useCalendarStore } from '../../hooks/useCalendarStore';

export const FabDeleteEvent = () => {
    const { startDeletingEvent, HasEventSelected  } = useCalendarStore();

    const handleClickDelete = () => {
        startDeletingEvent();
    }

    return (
        <button className='btn btn-danger fab-danger' onClick={handleClickDelete} style={{display: HasEventSelected ? '': 'none'}}>
            DEL
        </button>
    )
}
