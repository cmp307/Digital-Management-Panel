import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './styles/App.scss'
import Home from './pages/Home'
import Assets from './pages/Assets'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/assets" element={<Assets />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
