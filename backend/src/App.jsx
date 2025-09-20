import React from 'react'
import Home from './screens/Home'
// import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Menu from './screens/Menu'

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-black text-white'>
        <Routes>
          <Route path='/' element={
            <>
              <Home />
              {/* <Menu /> */}
            </>
          } />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App