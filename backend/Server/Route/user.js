const router=require('express').Router()

const { verifyToken } = require('../Auth')
// const { getDailyReport } = require('../Controller/UserreportController')
const {UserRegister,UserLogin,AttendanceSignIn,AttendanceSignOut,allusers,GetuserData,Getuserlogintime,EditUser,getDailyReport}=require('../Controller/userController')

router.post('/register',UserRegister)
router.post('/login',UserLogin)

router.post('/markattendance/:id',AttendanceSignIn)

router.post('/marksigout',AttendanceSignOut)

router.get('/allusers',allusers)


//get single user data
router.get('/getuserdata/:id',GetuserData)


router.get('/getusertime/:id',Getuserlogintime)

router.post('/EdituserRequest',EditUser)



//another page
router.get('/getdailyReport/:id',getDailyReport)



module.exports=router


