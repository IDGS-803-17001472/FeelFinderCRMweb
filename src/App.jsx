import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import Login from './pages/Login'
import Dashboard from './dashboard/Dashboard'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/users" element={<Dashboard/>} />
    <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
