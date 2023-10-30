import { useState, Fragment } from 'react'
import { HashRouter } from 'react-router-dom';

import './App.css'

// import components
import MiniDrawer from './components/MiniDrawer';

function App() {
  return (
    <HashRouter>
      <MiniDrawer/>
    </HashRouter>
  )
}

export default App;
