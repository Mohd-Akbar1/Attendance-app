import React, { useEffect, useState,useContext } from 'react'
import './Home.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

import { DataContext } from '../context';
import toast from 'react-hot-toast';

const Home = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [userdata,setuserdata]=useState([])
  const [today,setToday]=useState('')
 
  const [btn,setBtn]=useState(false)
 
  const [isLoggedin,setisLoggedin]=useState(true)
  const navigate=useNavigate()

  const {id,setId,In,setIn,out,setOut,name,status,setStatus,Time,setTime}=useContext(DataContext)
  
  
    useEffect(()=>{
    
      const dateandTime = () => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString();
        setCurrentDate(formattedDate);
        const formattedTime = date.toLocaleTimeString();
        setCurrentTime(formattedTime);
      };
  
      dateandTime();
      const intervalId = setInterval(dateandTime, 1000);
      
      
      


     
      
    

     

        
    },[])

   
  
  


    const showTodaysLogin=async()=>{
      
      const res=await axios.get(`http://localhost:8000/user/getusertime/${id}`)
      
      
      if(res.status==201){
        console.log('check',res.data)
      toast.error(res.data.msg)
      }else{
        setTime(res.data)
        
      }
      
      
      
    
    }
    
    

    
    
    

   
    

    const handleForSignIn=()=>{
      setStatus(!status)
      const fetchdata= async()=>{
        const res=await axios.post(`http://localhost:8000/user/markattendance/${id}`,{currentDate,currentTime,In})
        
        // setToday(res.data)
        console.log(res.data)
      

        
       
        
      
        if(res.status===202){
          
         
          toast.success(res.data.msg)
          setBtn(!btn)
          return
        
        }
        
        
        if(res.status==200){
          toast.success('signed In')
          setIn(res.data.report)
          console.log('signinId',In)
          return
        }else if(res.data.msg==true){
          setStatus(!status)
          
          
         
        }
      }
      fetchdata()

     
      
     
    }
    
    const handleForSignOut=()=>{
      setStatus(true)
      const fetchdata= async()=>{
        const res=await axios.post(`http://localhost:8000/user/marksigout`,{In,currentDate,currentTime})
        // console.log('forsignOut', res.data)
        
        if(res.status==200){

          toast.success(' you have signed out')
          // navigate('/')
          
        }
      }
      fetchdata()
     

    }

    const handleClick=()=>{
      localStorage.removeItem('token')
      setStatus(true)

      handleForSignOut()
      setTime('')
   
      navigate('/')
      // setuserTime({hours:0,minutes:0,seconds:0})
      
    }
const goBack=()=>{
  navigate(-1)

}
    
  return (
    <div className='Homepage'>
          <div className="head">
            <h1>Attendance App</h1>
          </div>

          <button onClick={goBack} className='Goback'>  Back</button>

        

        <div className="homedata">
        

          {/* fortime */}
          <div className="currentInfo">
            <p><b>Date</b> 
            <p>{currentDate}</p>
            </p>
            <p><b>Time</b> 
            <p>{currentTime}</p>
            </p>
        </div>
        

            <h1>Welcome {name} </h1>
            
                

            <div className="mark">

                  {status? <button onClick={handleForSignIn} className='btn in' >signIn</button>:
                  <button onClick={handleForSignOut} className='btn out'>signOut</button>}
              
            </div>
        

        </div>
        <div className="viewR">
        
              <div className="buttons">
              <Link to={'/report'}> <button className='btn'>View Report</button></Link>
              <button className='logout btn' onClick={handleClick}>Logout</button>
              </div>

              <div className="buttons">
              <button className='today btn ' onClick={showTodaysLogin}><b>Today's Login</b> </button>
                    {<p>{Time}</p> }
              </div>
       
     
         
         
          
                
                   
                    
                
                  
      
        </div>
      
    </div>
  )
}

export default Home
