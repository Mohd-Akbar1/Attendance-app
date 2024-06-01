const express=require('express')
const app=express()
const UserRouter=require('./Server/Route/user')
const AdminRouter=require('./Server/Route/admin')
const cors=require('cors')
const mongoose=require('mongoose')
var cookieParser = require('cookie-parser')
mongoose.connect('mongodb://127.0.0.1/AttendanceApp').then(()=>console.log('dbconnected'))


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use('/user',UserRouter)
// app.use('/admin',AdminRouter)



app.listen(8000,function(){
    console.log('Server is running')
})



// // Example strings representing times
// var timeStr1 = "2024-05-15 12:00:00";
// var timeStr2 = "2024-05-15 13:30:00";

// // Convert strings to Date objects
// var time1 = new Date(timeStr1);
// var time2 = new Date(timeStr2);

// // Calculate time difference in milliseconds
// var timeDiffMilliseconds = time2 - time1;

// // Convert milliseconds to seconds
// var timeDiffSeconds = timeDiffMilliseconds / 1000;

// // Convert seconds to hours, minutes, and seconds
// var hours = Math.floor(timeDiffSeconds / 3600);
// var minutes = Math.floor((timeDiffSeconds % 3600) / 60);
// var seconds = Math.floor(timeDiffSeconds % 60);

// // Format the time difference
// var formattedTimeDiff = hours.toString().padStart(2, '0') + ":" +
//                         minutes.toString().padStart(2, '0') + ":" +
//                         seconds.toString().padStart(2, '0');

// console.log("Time difference:", formattedTimeDiff);



