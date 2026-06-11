import express from 'express'
import mongoose from 'mongoose'
import router from '../routes/authRoutes.js';
import cors from 'cors'
import "dotenv/config"

const app = express();

app.use(cors())
app.use(express.json());
app.use(router);
app.listen(process.env.PORT);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Connection established");
})
.catch((err)=>{
    console.log(err);
    
})
