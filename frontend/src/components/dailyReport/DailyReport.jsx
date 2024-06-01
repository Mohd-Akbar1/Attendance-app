import React, { useContext, useEffect, useState } from 'react'
import './daily.css'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../context'
import axios from 'axios'

const DailyReport = () => {
    const {id}=useContext(DataContext)
    const navigate=useNavigate()
    const [daily,setDaily]=useState([])

    const handleClick=()=>{
        navigate(-1)
    }

useEffect(()=>{
    const DailyReport=async()=>{
      
        const res=await axios.get(`http://localhost:8000/user/getdailyReport/${id}`)
        const userdate=res.data
        setDaily(userdate)
        console.log(userdate)
        
        
    }
        DailyReport()
},[])








  return (
    <div className='dailyReport'>
        <div className="head">
            <h1>Daily Report</h1>
            
            

        </div>


        <button onClick={handleClick}>back</button>
        <div className="dailyLogindata">
                <table>
                    <thead>
                    <tr>
                        <th>date</th>
                        <th>Login Time</th>
                    </tr>
                    </thead>
                    <tbody>
                      {daily.map((user1, id) => (
                        <tr key={id}>
                          
                          <td>{user1.date}</td>
                          <td> {user1.time}</td>
                         
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>

      
    </div>
  )
}

export default DailyReport
