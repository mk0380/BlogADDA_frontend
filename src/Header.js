import React from 'react'
import {  useNavigate,NavLink } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()

  const logout =async () =>{
    const response =await fetch('https://blog-a74c.onrender.com/logout',{
      method:"POST",
      credentials:"include"
    })
    const result =await response.json();
    alert(result.message)
    if(result.success){
      localStorage.removeItem("user")
    }
    return navigate('/login')
  }

  const user = localStorage.getItem('user');

  return (
    <div style={{}}>
      <header >
        <NavLink to="/" className='logo active' style={{fontFamily: "'Tilt Prism', cursive"}}>BlogADDA</NavLink>
        <nav>
          <NavLink to="/about">About Us</NavLink>
        {!localStorage.getItem("user") && (<><NavLink to="/create">Create new post</NavLink><NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink></>)}
          {localStorage.getItem("user") && (<><NavLink to="/create">Create new post</NavLink>
          <NavLink to="/" onClick={logout}>Logout ({user})</NavLink></>)}
        </nav>
      </header>
    </div>
  )
}

export default Header
