import React from 'react'
import { Link, Routes, Route } from 'react-router-dom';

const id = "eddyfu";

function Home() {
    return (
        <div className="App">
          <h2>MIRO APP</h2>
          <p>Yogurt hecho a base frutas naturales!</p>
          <img className='img_logo' src="https://i.postimg.cc/jqzQ9ThL/LOGO-BACK.png" alt="logo" />
        </div>
    );
}

export {Home};