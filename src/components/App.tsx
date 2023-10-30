import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/electron-vite.animate.svg'
// import viteLogo from '../assets/electron-vite.animate.svg'
import '../styles/App.scss'
import TopBar from './TopBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TopBar />
      <div className="container py-4 px-3 mx-auto">
        <div className="text-center">
          <a className="btn btn-outline-primary" href="assets.html" role="button">View &amp; Manage Assets</a>
          <a className="btn btn-outline-primary" href="employees.html" role="button">View &amp; Manage Employees</a>
        </div>
      </div>
    </>
  )
}

export default App
