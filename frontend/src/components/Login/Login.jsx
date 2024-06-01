import React, { useContext, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { DataContext } from '../context';

const Login = () => {
  const [role, setRole] = useState('user'); 
  const [formdata,setFormdata]=useState({
    email:'',
    password:''
  })
  const {id,setId,name,setname}=useContext(DataContext)
 

    
const navigate=useNavigate()
    const handleSubmit=async(e)=>{
      e.preventDefault()

      const fetchData=async()=>{
        const res=await axios.post('http://localhost:8000/user/login',formdata)
        if(res.status==200){
          
          console.log(res.data.user.role)
          localStorage.setItem('token',JSON.stringify(res.data.token))
          
         
          setId(res.data.user._id)
          setname(res.data.user.name)
          console.log(res.data.user.role)
        
          toast.success(res.data.msg)
          if (res.data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/home');
          }
          


        }
       else{
        toast.error(res.data.msg)
       }
        

      }
      fetchData()
      console.log(formdata)




    }


    const handleChange=(e)=>{
      const {name,value}=e.target
      setFormdata({...formdata,[name]:value})
    }

    const handleChangerole = (e) => {
      const { name, value } = e.target;
      if (name === 'role') {
        setRole(value);
      } else {
        setFormdata({ ...formdata, [name]: value });
      }
    };


  return (
    <div className='LoginContainer'>
    <div className="headinglogo">
    <h1>Attendance App</h1>
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png" alt="" className='loginImage' />
    </div>
       
        <div className="loginform" >
        <h2>Login</h2>
       
     
            <form  onSubmit={handleSubmit} className='formdata' >
                <input type="text" placeholder='username' name='email'  value={formdata.email} onChange={handleChange} required/>
                <input type="password" placeholder='password' name='password'  value={formdata.password} onChange={handleChange} required/>
                
                {/* <div className="form-check">
            <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={handleChangerole} /> Admin
            <input type="radio" name="role" value="user" checked={role === 'user'} onChange={handleChangerole} /> User
          </div> */}
                <button type='submit' className='btn'>Login</button>
               

                <p >create new account <Link to={'/register'} style={{textDecoration:'none'}} >click here</Link></p>
            </form>
            

        </div>
      
    </div>
  )
}

export default Login
