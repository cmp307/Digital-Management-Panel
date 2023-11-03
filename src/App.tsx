import { Routes, Route, HashRouter } from 'react-router-dom'
import Home from './pages/Home'
import Assets from './pages/Assets'
import './styles/index.scss'
import Employees from './pages/Employees'
import CreateAssets from './pages/CreateAsset'

function App() {
  
  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/assets" element={<Assets />}></Route>
          <Route path="/assets/create" element={<CreateAssets />}></Route>
          <Route path="/employees" element={<Employees />}></Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
