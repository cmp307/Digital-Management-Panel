import { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Home from './pages/Home';
import HardwareAssets from './pages/assets/hardware/HardwareAssets';
import Employees from './pages/employee/Employees';
import CreateAssets from './pages/assets/hardware/CreateHardwareAsset';
import Error404 from './pages/Error404';
import HardwareAsset from './pages/assets/hardware/HardwareAsset';
import Employee from './pages/employee/Employee';
import Login from './pages/Login';
import Versions from './pages/Versions';
import SoftwareAssets from './pages/assets/software/SoftwareAssets';
import CreateEmployee from './pages/employee/CreateEmployee';
import CreateSoftwareAsset from './pages/assets/software/CreateSoftwareAsset';
import SoftwareAsset from './pages/assets/software/SoftwareAsset';
import EditSoftwareAsset from './pages/assets/software/EditSoftwareAsset';
import EditHardwareAsset from './pages/assets/hardware/EditHardwareAsset';

import './styles/index.scss';

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
          <Route path="/assets/:id" element={<HardwareAsset setUser={setUser} user={user} />} />
          <Route path="/assets/create" element={<CreateAssets setUser={setUser} user={user} />} />
          <Route path="/software" element={<SoftwareAssets setUser={setUser} user={user} />} />
          <Route path="/software/:id" element={<SoftwareAsset setUser={setUser} user={user} />} />
          <Route path="/software/create" element={<CreateSoftwareAsset setUser={setUser} user={user} />} />
          <Route path="/edit/software/:id" element={<EditSoftwareAsset setUser={setUser} user={user} />} />
          <Route path="/edit/assets/:id" element={<EditHardwareAsset setUser={setUser} user={user} />} />
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
