// scss
import './App.scss'

// routes
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// pages
import Home from './pages/Home/Home.tsx'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile.tsx'
import CreatePost from './pages/CreatePost/CreatePost'
import Post from './pages/Post/Post'
import EditPost from "./pages/EditPost/EditPost.tsx"

// components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// context
import { AuthProvider } from './context/AuthContext'

// firebase
import { onAuthStateChanged } from 'firebase/auth'

// hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [auth])

    if (loadingUser) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>
    }

  return (
    <div className="App">
        <AuthProvider value={{ user }}>
            <BrowserRouter>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={ <Home key="postList" /> }/>
                        <Route path="/search" element={ <Home key="postListSearch" /> }/>
                        <Route path="/posts/:id" element={ <Post /> }/>
                        <Route path="/about" element={ <About /> }/>
                        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" /> }/>
                        <Route path="/register" element={ !user ? <Register /> : <Navigate to="/" /> }/>
                        <Route path="/posts/create" element={ user ? <CreatePost /> : <Navigate to="/" /> }/>
                        <Route path="/posts/edit/:id" element={ user ? <EditPost /> : <Navigate to="/" /> }/>
                        <Route path="/profile" element={ user ? <Profile /> : <Navigate to="/" /> }/>
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    </div>
  )
}

export default App
