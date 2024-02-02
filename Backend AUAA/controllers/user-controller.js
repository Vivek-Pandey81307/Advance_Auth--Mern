import User from '../model/User.js'
const signup  = async(req,res,next)=>{
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });
    try{
        await user.save();
    }catch(err){console.log(err)}
    return res.status(201).json({message : user})
    
}
export {signup};