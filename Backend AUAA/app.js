import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/user-routes.js';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
app.use('/api', router);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000);
        console.log("Database is connected listening to localhost 5000");
    })
    .catch((error) => console.log(error));
