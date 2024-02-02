import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/user-routes'
dotenv.config()
const app = express();
app.use('/api',router)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(5000);
    console.log("Database is connected listening to localhost 5000")
})
.catch((error)=>console.log(error))