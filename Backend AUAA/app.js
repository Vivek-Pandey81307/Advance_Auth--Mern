import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/user-routes.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',router);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(5000);
    console.log("Database is connected listening to localhost 5000");
})
.catch((error)=>console.log(error))