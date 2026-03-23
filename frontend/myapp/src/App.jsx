import { useState } from 'react'

import './App.css'
import { Signin } from './components/Signin'
import {Signup} from './components/Signup'
import {Create} from './components/Create'
import {Routes,Route} from 'react-router-dom'

function App() {
  

  return (

  <Routes>
    <Route path="/" element={<Signin/>}></Route>
    <Route path="/signup" element ={<Signup/>}></Route>
  <Route path="/create" element={<Create/>}></Route>
  </Routes>

  )
}

export default App
