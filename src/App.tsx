import './styles/index.scss';

import { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

import HardwareAssets from './pages/assets/hardware/HardwareAssets';
import HardwareAsset from './pages/assets/hardware/HardwareAsset';
import CreateHardwareAsset from './pages/assets/hardware/CreateHardwareAsset';
import EditHardwareAsset from './pages/assets/hardware/EditHardwareAsset';
import InstallSoftware from './pages/assets/hardware/InstallSoftware';

import SoftwareAssets from './pages/assets/software/SoftwareAssets';
import SoftwareAsset from './pages/assets/software/SoftwareAsset';
import CreateSoftwareAsset from './pages/assets/software/CreateSoftwareAsset';
import EditSoftwareAsset from './pages/assets/software/EditSoftwareAsset';

import Employees from './pages/employee/Employees';
import Employee from './pages/employee/Employee';
import CreateEmployee from './pages/employee/CreateEmployee';
import EditEmployee from './pages/employee/EditEmployee';

import Error404 from './pages/Error404';
import Versions from './pages/Versions';
import ScanSoftware from './pages/assets/software/ScanSoftware';

function App() {
  const [user, setUser] = useState(undefined as any);
  const [hasRan, setRan] = useState(false);

  if (!user) {
    try {
      const storage_user = JSON.parse(localStorage.getItem('user')!);
      if (storage_user && storage_user !== '[object Object]')
        setUser(storage_user);
    } catch (error) {}

    if (!user || user.status == false) {
      return <Login setUser={setUser} user={user} />
    }
  }
  
  return (
    <>
      <HashRouter>
        <Routes>
          {/* Index Route */}
          <Route index element={<Home setUser={setUser} user={user} hasRan={hasRan} setRan={setRan} />} />

          {/* Hardware Routes */}
          <Route path="/hardware" element={<HardwareAssets setUser={setUser} user={user} />} />
          <Route path="/hardware/:id" element={<HardwareAsset setUser={setUser} user={user} />} />
          <Route path="/hardware/create" element={<CreateHardwareAsset setUser={setUser} user={user} />} />
          <Route path="/hardware/:id/edit" element={<EditHardwareAsset setUser={setUser} user={user} />} />
          <Route path="/hardware/:id/install" element={<InstallSoftware setUser={setUser} user={user} />} />

          {/* Software Routes */}
          <Route path="/software" element={<SoftwareAssets setUser={setUser} user={user} />} />
          <Route path="/software/:id" element={<SoftwareAsset setUser={setUser} user={user} />} />
          <Route path="/software/create" element={<CreateSoftwareAsset setUser={setUser} user={user} />} />
          <Route path="/software/:id/edit" element={<EditSoftwareAsset setUser={setUser} user={user} />} />
          <Route path="/software/:id/scan" element={<ScanSoftware setUser={setUser} user={user} />} />

          {/* Employee Routes */}
          <Route path="/employees" element={<Employees setUser={setUser} user={user} />} />
          <Route path="/employees/:id" element={<Employee setUser={setUser} user={user} />} />
          <Route path="/employees/create" element={<CreateEmployee setUser={setUser} user={user} />} />
          <Route path="/employees/:id/edit" element={<EditEmployee setUser={setUser} user={user} />} />

          {/* Misc. Routes */}
          <Route path="/versions" element={<Versions setUser={setUser} user={user} />} />
          <Route path='*' element={<Error404 setUser={setUser} user={user} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
