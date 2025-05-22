import './App.css'
import Nav from './components/Nav'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/home' element={<div>Home</div>}/>
        <Route path='/about' element={<div>About</div>}/>
        <Route path='/contact' element={<div>Contact</div>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
