// scss
import './App.scss'

// routes
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

// components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={ <Home /> }/>
                    <Route path="/about" element={ <About /> }/>
                    <Route path="/login" element={ <Login /> }/>
                    <Route path="/register" element={ <Register /> }/>
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    </div>
  )
}

export default App
