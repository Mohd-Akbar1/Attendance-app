const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.cookies.authtoken
    if (!token){
        return res.json({msg:'you are not authenticated'})
    }
    jwt.verify(token,'mysecret',(err,user)=>{
        if(err){
            return res.json({msg:'Error in verify token'})
        }
        req.user=user
        next()
    })
}

module.exports={
    verifyToken
}