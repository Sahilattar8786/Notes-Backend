// server.js
const express = require("express");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoute=require('./routes/userRoute');
const noteRoute=require('./routes/noteRoute');
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const cors=require('cors')
const path=require('path');
const app = express();
dotenv.config(); // Load environment variables from .env file
connectDB();
app.use(express.json());


app.use(cors())
app.use("/api/users", userRoute);
app.use("/api/notes",noteRoute)
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
//   Development 


const __dirname1=path.resolve();
if(process.env.NODE_ENV === 'production')
{
   app.use(express.static(path.join(__dirname1,'/frontend/build')));
   app.get('*',(req,res)=>{
       res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
   })
}else{
    app.get('/', (req, res) => {
        res.send("Running Api")
    });
}
//  Development 
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
