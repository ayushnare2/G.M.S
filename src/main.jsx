import React from 'react'
import  ReactDOM from 'react-dom/client'
import  createRoot from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Addmember from './pages/Addmember.jsx';
import Addtrainer from './pages/Addtrainer.jsx';
import Members from './pages/Members.jsx';
import Trainers from './pages/Trainers.jsx';




import {createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminNotes from './pages/AdminNotes.jsx';

const router = createBrowserRouter([
  { path:'/',
    element: <App />,
    children: [
      { path:'', element: <Dashboard />},
      { path:'addmember', element: <Addmember />},
      { path:'addtrainer', element: <Addtrainer />},
      { path:'members', element: <Members />},
      { path:'trainers', element: <Trainers />},
      { path:'adminnotes', element: <AdminNotes />},
    ]
  },
])  

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




