import express from 'express'
const app = express();
const port = 3000;
app.use('/',(req,res,next)=>{
    res.send("Hello there")
})
console.log("yeahhhhhhh")
app.listen(port,()=>{
    console.log("listening to localhost 3000")
})