require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors=require("cors");

const authRoutes = require("./routes/authRoutes");
const app =express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.error("MongoDB Connection Error:",err))
//routes
app.use("/api/auth", authRoutes);


app.get("/",(req,res)=>{
    res.send("Server is running...");
});

app.listen(PORT,()=> console.log(`server running on port ${PORT}`));