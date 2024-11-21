import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import Login from './pages/Login'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/users" element={<UsersPage/>} />
    <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
