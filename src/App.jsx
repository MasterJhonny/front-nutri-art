import { useState, Fragment } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css'

// import components
import { Home } from './pages/Home'
import { InventoryMaterial } from './pages/InventoryMaterial';
import { Labour } from './pages/Labour';
import { IndirectCosts } from './pages/IndirectCosts'
import { Users } from './pages/Users'
import { NotFound } from './pages/NotFound'
import { User } from './pages/User'
import { Login } from './pages/Login'
import MiniDrawer from './components/MiniDrawer'

function App() {
  const [auth, setAuth] = useState(true)

  return (
    <BrowserRouter>
      <MiniDrawer/>
      
    </BrowserRouter>
  )
}

export default App
