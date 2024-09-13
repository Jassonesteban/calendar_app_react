import React from 'react'
import { Approuter } from './router/Approuter'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

export const CalendarApp = () => {
  return (
    <Provider store={store}>
       <BrowserRouter>
      <Approuter/>
    </BrowserRouter>
    </Provider>
  )
}
