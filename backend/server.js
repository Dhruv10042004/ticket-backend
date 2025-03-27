const express=require('express')
const cors=require('cors')
const colors=require('colors')
const dotenv=require('dotenv').config()
const connectDB=require('./config/db')
const {errorHandler}=require('./middleware/errorMiddleware')
const PORT =process.env.PORT ||8000
connectDB()
const app=express()
app.use(cors({
    origin: 'https://fs2010.netlify.app', // Replace with your frontend's origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization', // Include 'Authorization' here
  }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://fs2010.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to the Support Desk Api'})
})
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/tickets',require('./routes/ticketRoutes'))
app.use(errorHandler)
app.listen(PORT,()=>{console.log(`Server Started on port ${PORT}`)})