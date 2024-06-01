const { JsonWebTokenError } = require("jsonwebtoken");
const {User,Report,Time} = require("../database/user")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const Timedifference = require("./timecalculator");


const UserRegister = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(203).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword    
        });

        if (newUser) {
            return res.status(200).json({ msg: 'User account created successfully' });
        }
    } catch (error) {
        console.error('Error occurred in creating account:', error);
    }

    return res.json({ msg: 'Error occurred in creating account' });
}

const UserLogin=async(req,res)=>{

    const {email,password}=req.body
    console.log(req.body)
    const user=await User.findOne({email:email})
    
    if(user){
        

    const hashedpassword=await bcrypt.compare(password,user.password)

    if(hashedpassword){
       
        
        const data={
            id:user._id,
            user:user.email
        }
        const token=jwt.sign(data, 'mysecret', { expiresIn: '1d' });


        return res.status(200).cookie('authtoken',token,{httpOnly:true}).json({msg:"You have logged in successfully",user,token})

    }else{
        return res.status(201).json({msg:'email or password mis-matched'})
    }
    }
    return res.status(203).json({msg:"user Doesn't exist"})

    

    


}

const AttendanceSignIn=async(req,res)=>{
   try {
    const id=req.params.id;
    // const In=req.body.In
    
   
    const formattedDate = req.body.currentDate;

    const report=await Report.create({
        date:req.body.currentDate,
        SignIn:req.body.currentTime

    })
   
   
       try {
        const data=await User.findById(id)
       
        // let find = data.days.find((d) => d.date == date);
        // //--update the status
        // if (!find) {
        //   data.days.push({ date: formattedDate, time: '00:00:00' });
        //   data.save();
        
      
            
            const user=await User.findByIdAndUpdate({_id:id}, { $push: { userReport: report } })
            if(user){
        
                return res.status(200).json({msg:'SignIn updated',report:report._id})
            }
        
         
        
       } catch (error) {
        
        console.log('error in signIn:',error)
       }
    

  
   
    
    
   } catch (error) {
    console.log("error in singout",error)
    
   }

}
const AttendanceSignOut=async(req,res)=>{
    try {
        
    const In=req.body.In
    
    
    const report = await Report.findOneAndUpdate(
        {_id: In }, 
        { $set: { SignOut: req.body.currentTime } }
      );
     
     
    if(report){
        
        return res.status(200).json({msg:'SignOut updated'})
    }
    return res.json({msg:'Error in SignOut updating'})
    } catch (error) {
        console.log("error in singout",error)
        
    }

}


//GET ALL USERS

const allusers=async( req,res)=>{
    const user=await User.find({})
   
    return res.json(user)

}



//GET SINGLE USER DATA
const GetuserData= async(req,res)=>{
   try {
    const id=req.params.id;
   
    const user=await User.findOne({_id:id}).populate({
        path:'userReport'
    })
    
    
    

    return res.status(200).json(user)
   } catch (error) {
    console.log(error)
    
   }


}


//get user login time
const Getuserlogintime= async(req,res)=>{

   try {
    const id=req.params.id
    
    
        var today = new Date();


        var month = today.getMonth() + 1; 
        var day = today.getDate();
        var year = today.getFullYear();

        var formattedDate = month + '/' + day + '/' + year;

        var todaydate =today.toLocaleTimeString()
        console.log("todaydate:",todaydate)

        

// console.log("formattedDate:",formattedDate);


   
    
    
   
    

    const usertime=await User.findOne({_id:id}).populate({
        path:'userReport',
        match: { date:formattedDate}
    })
    

    if (!usertime.userReport || usertime.userReport.length === 0) {
        return res.status(201).json({ msg: 'No Login for today!' });
    }

 let starttime= await (usertime.userReport[0].SignIn) 
 console.log("starttime:",starttime)
 let lastTime= usertime.userReport[usertime.userReport.length - 1].SignOut || usertime.userReport[usertime.userReport.length - 2].SignOut  || todaydate

 console.log("Endtime:",lastTime)

 let TotaltimeSpent = Timedifference(starttime, lastTime);
 console.log(TotaltimeSpent)

 
 const data=await User.findById(id)
       
        let find = data.days.find((d) => d.date== formattedDate);
      
        console.log('find is:',find)
        if (find) {
            const index = data.days.indexOf(find);
            if (index > -1) {
                data.days.splice(index, 1);
              }
            // data.days.remove(find)
          data.days.push({ date: formattedDate, time: TotaltimeSpent });
          data.save();
        }
    
  

   
  return res.status(200).json(TotaltimeSpent)




    
   } catch (error) {
    console.log(error)
   }
}


//Edit user data time

const EditUser=async(req,res)=>{
    console.log(req.body)
    const report=await Report.findByIdAndUpdate({_id:req.body.EditId}, { $set: { SignOut: req.body.time } })
    if (report){
        console.log('updated timme sucessfully')
        return res.json({msg:'updated timme sucessfully'})
    }
    


}

const getDailyReport=async(req,res)=>{
    try {
        const id=req.params.id;
   
         const user=await User.findOne({_id:id}).populate('days')
    console.log(user.days)
    return res.json(user.days)
    } catch (error) {
        console.log(error)
        
    }
}
module.exports={
    UserRegister,UserLogin,AttendanceSignIn,AttendanceSignOut,allusers,GetuserData,Getuserlogintime,EditUser,getDailyReport
}


