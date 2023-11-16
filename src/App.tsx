import { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom'
import Home from './pages/Home'
import HardwareAssets from './pages/assets/hardware/HardwareAssets'
import './styles/index.scss'
import Employees from './pages/employee/Employees'
import CreateAssets from './pages/assets/hardware/CreateAsset'
import Error404 from './pages/Error404'
import Asset from './pages/assets/hardware/Asset'
import Employee from './pages/employee/Employee'
import Login from './pages/Login'
import Versions from './pages/Versions';
import EditAsset from './pages/assets/hardware/EditAsset';
import SoftwareAssets from './pages/assets/software/SoftwareAssets';

function App() {
  const [user, setUser] = useState(undefined as any);
  if (!user) {
    try {
      const storage_user = JSON.parse(localStorage.getItem('user')!);
      if(storage_user && storage_user !== '[object Object]')
      setUser(storage_user);
    } catch (error) {
      console.log('Could not retrieve previous session.')
    }

    if (!user || user.status == false) {
      return <Login setUser={setUser} user={user} />
    }
  }
  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Home setUser={setUser} user={user} />} />
          <Route path="/versions" element={<Versions setUser={setUser} user={user} />} />
          <Route path="/assets" element={<HardwareAssets setUser={setUser} user={user} />} />
          <Route path="/assets/:id" element={<Asset setUser={setUser} user={user} />} />
          <Route path="/assets/create" element={<CreateAssets setUser={setUser} user={user} />} />
          <Route path="/software" element={<SoftwareAssets setUser={setUser} user={user} />} />
          <Route path="/edit/assets/:id" element={<EditAsset setUser={setUser} user={user} />} />
          <Route path="/employees" element={<Employees setUser={setUser} user={user} />} />
          <Route path="/employees/:id" element={<Employee setUser={setUser} user={user} />} />
          <Route path="/employees/create" element={<CreateEmployee setUser={setUser} user={user} />} />
          {/* <Route path="/edit/employees/:id" element={<EditEmployee setUser={setUser} user={user} />} /> */}
          <Route path='*' element={<Error404 setUser={setUser} user={user} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
