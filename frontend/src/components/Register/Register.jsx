import React, { useState } from 'react'
import './register.css'
import { Link, redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [see,setSee]=useState(false)
  const [formdata,setFormdata]=useState({
    name:'',
    email:'',
    password:"",
    phone:''

  })

  const handleChange=(e)=>{
    const {name,value}=e.target;

    if(name=='phone'){
      if(isNaN(value) && length(value)<=10){
        alert('invalid input please check')

      }
      
    }
    setFormdata({...formdata,[name]:value})
  }
  const navigate=useNavigate()

    const handleSubmit=async(e)=>{
      e.preventDefault()

      const fetchData=async()=>{
        const res=await axios.post('http://localhost:8000/user/register',formdata)
        if(res.status==200){
          toast.success(res.data.msg)
          navigate('/')


        }
       else{
        toast.error(res.data.msg)
      
       }
        

      }
      fetchData()
      



    }
    const handleSeePassword=()=>{
      setSee(!see)
    }
  return (
    <div>
        <div className='LoginContainer'>
          <div className="headingLogo">
          <h1>Regester If You are new !</h1>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-sign-up-4489353-3723261.png" alt="" className='signupimage' />
          </div>
       
       <div className="loginform" >
       <h2>Register</h2>
    
           <form  onSubmit={handleSubmit} className='formdata' >
               <input type="text" name='name' placeholder='username' required  value={formdata.name} onChange={handleChange}/>
               <input type={!see?'password':'text'} name='password' placeholder='password' required  value={formdata.password} onChange={handleChange}/>
               <div className='seePassword'>
               {see?<FaEye onClick={handleSeePassword} />:<FaEyeSlash  onClick={handleSeePassword} />}
               </div>
              
               <input type="email"  name='email' placeholder='Email'  required value={formdata.email} onChange={handleChange}/>
               <input type="tel"  pattern="[0-9]*" maxlength="10"   name='phone' placeholder='Phone-Number'  required  value={formdata.phone} onChange={handleChange}/>
               <button type='submit' className='btn'>Register</button>


           </form>
           <p>Already have an account <Link to={'/'} style={{textDecoration:'none'}}>click here</Link></p>
       </div>
     
   </div>
      
    </div>
  )
}

export default Register
