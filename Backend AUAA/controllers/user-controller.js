import User from '../model/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const signup  = async(req,res,next)=>{
    const {name,email,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email:email})
    }catch(err){console.log(err)}
    if(existingUser){
        return res.status(400).json({message : "user already exists! Login Instead"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password : hashedPassword
    });
    try{ 
        await user.save();
    }catch(err){console.log(err)}
    return res.status(201).json({message : user})
    
}
const login = async(req,res,next)=>{
    let inputEmail
    try{
        inputEmail = await User.findOne({email:req.body.email})
    }catch(err){console.log(err);return res.status(404).json({message : "User with provided email doesn't exist"})}
    const hashedInputPassword = bcrypt.hashSync(req.body.password)
    if(!bcrypt.compareSync(req.body.password,inputEmail.password)){
       return res.status(401).json({message : "Incorrect Password"})
    }
    const token = jwt.sign({id:inputEmail.__id},process.env.SECRET_KEY,{expiresIn : "1hr"})
    return res.status(200).json({message:"Successfully login with registered email!",user:inputEmail,token})
 
}

export {signup,login};