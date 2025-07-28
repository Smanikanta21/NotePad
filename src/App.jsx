import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/LoginPage'
import Signup from './components/SignupPage'
import LandingPage from './components/LandingPage'
import { ToastContainer } from 'react-toastify'
import Setting from './components/settings'
import Profile from './components/Profile'
import Contact from './components/Contact'
import { BrowserRouter,Routes,Route,Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<><Nav /><Outlet /></>}>
          <Route path='/home' element={<Home />} />
          <Route path='/settings' element={<Setting/>}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>

    </>
  )
}

export default App
