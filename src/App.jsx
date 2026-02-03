import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './Auth/SignUp'
import Login from './Auth/Login';
import User from './DashBoard/User';
import Layout from './layout/Layout'
import AllBlog from './View/AllBlog';
import NewBlog from './create/NewBlog';

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50'>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<SignUp/>} />
        <Route path="login" element={<Login />} />
        <Route path="layout" element={<Layout />} >
            <Route path="view" element={<AllBlog />} />
               <Route path="create" element={<NewBlog />} />
               <Route path='user' element={<User/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App