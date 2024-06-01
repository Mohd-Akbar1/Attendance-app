const router=require('express').Router()

router.get('/',function(req,res){
    return res.send('admin')
})


module.exports=router
