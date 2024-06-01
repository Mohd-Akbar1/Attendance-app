const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    userReport: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }],
    days: [],
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
},{timestamps:true})



const ReportSchema = new mongoose.Schema({
    date:{
        type:String
    },
    SignIn: {
        type: String,
        default:Date.now()


        
    },
    SignOut: {
        type: String
    },
    totalLogin:{
        type:String
    }
    

   
})

const timeSchema=new mongoose.Schema({
    todaydate:{
        type:String,
        unique:true
    },
    LoginTime:{
        type:String,
        default:'00:00:00'
    }
})

// timeSchema.index({ date: 1 }, { unique: true });
const Time=new mongoose.model('Time',timeSchema)
const Report=new mongoose.model('Report',ReportSchema)
const User=new mongoose.model('User',UserSchema)


module.exports={User,Report,Time}