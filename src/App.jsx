import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<div>About</div>}/>
        <Route path='/contact' element={<div>Contact</div>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
