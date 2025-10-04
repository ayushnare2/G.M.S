import React from 'react'
import { NavLink } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css'

const Sidebar = () => {
  return (
   <div className='menu'>
        <div className='logo'>
           <h2>G.M.S</h2>
        </div>

        <div className='menu-list'>
        <NavLink to="/" end className={({ isActive }) => `item ${isActive ? 'active' : ''}`}>
          <i className="bi bi-house"></i> Dashboard
        </NavLink>

        <NavLink to="/addmember" className={({ isActive }) => `item ${isActive ? 'active' : ''}`}>
          <i className="bi bi-plus-circle-dotted"></i> Add Member
        </NavLink>

        <NavLink to="/addtrainer" className={({ isActive }) => `item ${isActive ? 'active' : ''}`}>
          <i className="bi bi-plus-circle-dotted"></i> Add Trainer
        </NavLink>

        <NavLink to="/members" className={({ isActive }) => `item ${isActive ? 'active' : ''}`}>
         <i class="bi bi-people-fill"></i> Members
        </NavLink>

        <NavLink to="/trainers" className={({ isActive }) => `item ${isActive ? 'active' : ''}`}>
           <i class="bi bi-person-check"></i> Trainers
        </NavLink>

        <NavLink to="/paymentstatus" className={({ isActive }) => `item ${isActive ? 'active' : ''}`}>
          <i class="bi bi-wallet2"></i> Payment Status
        </NavLink>
    
        </div>
      
    </div>
  )
}

export default Sidebar
