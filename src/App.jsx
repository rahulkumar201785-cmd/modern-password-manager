import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
// App.jsx
function App() {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <Manager />
      <Footer />
    </div>
  )
}

export default App
