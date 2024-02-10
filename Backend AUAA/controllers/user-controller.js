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
    // const hashedInputPassword = bcrypt.hashSync(req.body.password)
    if(!bcrypt.compareSync(req.body.password,inputEmail.password)){
       return res.status(401).json({message : "Incorrect Password"})
    }
    const token = jwt.sign({id:inputEmail._id},process.env.SECRET_KEY,{expiresIn : "30s"})
    res.cookie(String(inputEmail._id),token,{
        path : '/',expires: new Date(Date.now()+1000*30),
        httpOnly:true,sameSite : 'lax'
    })
    return res.status(200).json({message:"Successfully login with registered email!",user:inputEmail})
 
}
const verifyToken = (req,res,next)=>{
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1]
    if(!token){return res.status(404).json({message : "No token found"})}
    jwt.verify(String(token),process.env.SECRET_KEY,(err,user)=>{
        if(err){
           return  res.status(404).json({message:"Token doesn't match"})
        }
        req.id = user.id;
        
    });next();
}
const getUser = async(req,res,next)=>{
    const userId = req.id;
    let user;
    try{
        user = await User.findById(userId,"-password")
    }catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(404).json({message :"User not found"})
    }return res.status(200).json({user})
}
const refreshToken = (req,res,next)=>{
    const cookie = req.headers.cookie;
    const prevToken = cookie.split("=")[1]
    if(!prevToken){
        return res.status(400).json({message:"Couldn't find token"})
    }
    jwt.verify(String(prevToken),process.env.SECRET_KEY,(err,user)=>{
        if(err){console.log(err);return res.status(403).json({message:'Authentication failed'})}
        res.clearCookie( `${user.id}`)
        req.cookie[`${user.id}`]="";

        const token = jwt.sign({id:user.id},JWT_SECRET_KEY,{expiresIn:"30s"})
        res.cookie(String(user.id),token,{
            path : '/',expires: new Date(Date.now()+1000*30),
            httpOnly:true,sameSite : 'lax'
        })
        req.id = user.id
        next();
    })
}
export {signup,login,verifyToken,getUser,refreshToken};