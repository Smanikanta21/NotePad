import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/LoginPage'
import Signup from './components/SignupPage'
import LandingPage from './components/LandingPage'
import Setting from './components/settings'
import { BrowserRouter,Routes,Route,Outlet } from 'react-router-dom'
function App() {

  return (
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<><Nav /><Outlet /></>}>
          <Route path='/home' element={<Home />} />
          <Route path='/settings' element={<Setting/>}/>
          <Route path='/contact' element={<div>Contact</div>} />
        </Route>
      </Routes>
  )
}

export default App
