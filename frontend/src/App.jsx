
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './components/home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Report from './components/Report/Report'
import Admin from './components/Admin/Admin'
import DailyReport from './components/dailyReport/DailyReport'

function App() {
  const isTrue=localStorage.getItem('token')
  console.log(Boolean(isTrue))
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={isTrue?<Home/>:<Login/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/report' element={isTrue? <Report/>:<Login/>}/>
      <Route path='/admin' element={isTrue? <Admin/>:<Login/>}/>
      <Route path='/dailyreport' element={isTrue? <DailyReport />:<Login/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
