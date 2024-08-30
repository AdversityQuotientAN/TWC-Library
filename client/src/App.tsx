import './App.css'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from './Context/useAuth'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
        <Footer />
      </UserProvider>
    </>
  )
}

export default App
