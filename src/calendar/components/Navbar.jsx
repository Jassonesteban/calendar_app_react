import React from 'react'
import { UseAuthStoreCopy } from '../../hooks/UseAuthStoreCopy'

export const Navbar = () => {

  const {startLogout, user} = UseAuthStoreCopy();



  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            {user.name}
        </span>

        <button className='btn btn-outline-danger' onClick={startLogout}>
            <span>Salir</span>
        </button>
    </div>
  )
}
