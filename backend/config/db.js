const mongoose = require('mongoose')
const connectDB =async()=>{
    try
    {
        console.log("MONGO_URI:", process.env.MONGO_URI);
const conn=await mongoose.connect(process.env.MONGO_URI)
console.log(`MongoDB connected :${conn.connection.host}`.cyan.underline) 
}
    catch(err)
    {
console.log(`Error: ${err.message}`.red.underline.bold)
process.exit(1)
    }

}
module.exports = connectDB