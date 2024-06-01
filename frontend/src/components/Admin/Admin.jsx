import React, { useContext, useEffect, useState } from 'react'
import './admin.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../context'

const Admin = () => {
  const [user,setuser]=useState([])
  const {setId}=useContext(DataContext)

  const handleView=(id)=>{
    setId(id)
    console.log(id)
  }

  useEffect(()=>{
    const fetchData=async()=>{
      const res=await axios.get('http://localhost:8000/user/allusers')
      setuser(res.data)

      setId(user._id)
    }
    fetchData()
  },[])
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className='AdminPage'>
        <button className='LogoutbtnforAdmin' onClick={handleLogout}>Logout</button>
        <div className="Adminhead">
            <h1>Admin Panel</h1>
            <p>Employees Attendance</p>
        </div>
          
          
          

           <table style={{width:'99%'}}>
  <thead>
    <tr>
      <th>Email</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Action</th>
      <th>Daily Report</th>
    </tr>
  </thead>
  <tbody>
    {user.map((u, id) => (
      <tr key={id}>
        <td>{u.email}</td>
        <td>{u.name}</td>
        <td>{u.phone}</td>
        <td>
          <Link to={'/report'} onClick={() => handleView(u._id)} style={{ textDecoration: 'none' }}>
            <b>View</b>
          </Link>
        </td>
        <td>
        <Link to={'/dailyreport'} onClick={() => handleView(u._id)} style={{ textDecoration: 'none' }}>
            <b>see</b>
          </Link>
          </td>
      
      </tr>
    ))}
  </tbody>
</table>

            
          

        </div>
      
   
  )
}

export default Admin
