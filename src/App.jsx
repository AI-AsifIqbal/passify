import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Footer from "./components/Footer"
import Manager from "./components/Manager"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <div className="flex-grow bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Manager /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
