
const expresse=require('express');
const app=expresse()

const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Rihab:KRrQ7T0BGKsgL2YU@cluster0.djvbkfg.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0")

const UserModel = require('./models/Users');


app.get("/user", async(req,res)=>{
   const users=await UserModel.find();
    res.json(users)
})
app.listen(3006, () => {
    console.log("Server is running on port 3006");
});

