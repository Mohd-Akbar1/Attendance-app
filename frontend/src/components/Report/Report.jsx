import React, { useContext, useState, useEffect} from 'react'
import './report.css'
import { DataContext } from '../context'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import { CiClock1 } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { CgCalendarDates } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

const Report = () => {

 const  [user,setUser]=useState([])
 const [userEdit,setUserEdit]=useState(false)

 const [time, setTime] = useState('');
  const [period, setPeriod] = useState('AM');
  const [Reason,setReason]=useState('')
  const [EditId,setEditId]=useState('')

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

const {id}=useContext(DataContext)
console.log('idis:',id)




  useEffect(()=>{
    const fetchData=async ()=>{
      const res=await axios.get(`http://localhost:8000/user/GetuserData/${id}`,{
       
      })
      setUser(res.data.userReport)
      console.log(user)
    }
    fetchData()
  },[])

 console.log("user:",user)
 const navigate=useNavigate()

 const handleLogout=()=>{
  navigate('/')
  
 }
 const goBack=()=>{
  navigate(-1)
 }

 //function to handle edit
 const handleEditclick=(id)=>{
setUserEdit(!userEdit)
setTime('');
setEditId(id)

 }
 const handleSubmit=async()=>{
  console.log(time,period,Reason)
  setPeriod('AM')
  setReason('')
  setTime('')
  try {
    const response = await axios.post('http://localhost:8000/user/EdituserRequest', {
      time: time + ':00'+' ' +period,
      period,
      Reason,
      EditId
    });
    toast.success('Request submitted successfully');
    setUserEdit(!userEdit)
    
  } catch (error) {
    toast.error('Error submitting request');
  }
 }

  return (
    <div className='ReportPage'>
        <div className="head">
            <h1>Report</h1>
            <div className="logout">
              <button onClick={handleLogout} className='btn log'>Logout</button>
              <button onClick={goBack} className='goback'>Back</button>
             
            </div>
           
        </div>
           
            
        
            <table style={{width:'100%'}}>
                    <thead>
                      <tr>
                        <th><div className="time"><CgCalendarDates /> Date</div></th>
                        <th ><div className='time'><CiClock1 /> Sign In</div></th>
                        <th ><div className='time'><CiClock2 /> Sign Out</div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((user1, id) => (
                        <tr key={id}>
                          
                          <td>{user1.date}</td>
                          <td> {user1.SignIn || 'Absent'} &nbsp;&nbsp;&nbsp; <CiEdit className='edit' onClick={()=>handleEditclick(user1._id)}/></td>
                          <td>{user1.SignOut || 'Absent'} &nbsp;&nbsp;&nbsp; <CiEdit className='edit' onClick={()=>handleEditclick(user1._id)}/></td>
                        </tr>
                      ))}
                    </tbody>
            </table>
            {userEdit&& <div className="userEdit">

              <div className="usereditdata">
                    <div className="edithead">
                    <h1>Edit Now</h1>
                    <IoMdCloseCircle onClick={handleEditclick} className='edit'/>
                    </div>
                    <hr />
                    <div className="editTime">
                     <label htmlFor="">Time:</label><br />
                      <input type="time" value={time} onChange={handleTimeChange} /> &nbsp;
                      <select value={period} onChange={handlePeriodChange}>
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                    </select>
                    <br />
                    <label htmlFor="re">Share your reason </label><br />
                    <textarea name="reason" value={Reason} id="re" cols={50} required onChange={(e)=>setReason(e.target.value)}></textarea>
                    
                    </div>
                    <button type='submit' className='btn Editsubmit' onClick={handleSubmit}>submit</button>
                   

              </div>
            </div>     }



          </div> 
     

      
  
  )
}

export default Report
