import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Assets from './pages/Assets'
import './styles/index.scss'
import Employees from './pages/Employees'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/assets" element={<Assets />}></Route>
          <Route path="/employees" element={<Employees />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
