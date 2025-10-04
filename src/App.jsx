import React from 'react'
import './App.css'

import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <div className="app-layout" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content-container" >
        <Outlet />
      </div>
    </div>

  )
}

export default App
