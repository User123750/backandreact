const express = require('express')

const cors =require("cors")
const mongoose = require('mongoose')
const app=express()
app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 5000


const schemaData = mongoose.Schema({

    name:String,
    email:String,

},{
    timestamps :true
})

const userModel = mongoose.model("stggs",schemaData)



app.get("/",async(req,res)=>{
    try{

    
    const data = await userModel.find({})

    res.json({success : true , data : data})
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Failed to update data" });
    }
})




app.post("/create",async(req,res)=>{
    try{

    
    console.log(req.body)
    const data =new userModel(req.body) 
    await data.save()
    res.send({success : true , message : "data save successfuly", data:data})
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Failed to update data" });
    }
})



app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send({ success: true, message: "Data updated successfully", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Failed to update data" });
    }
});


app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    try{

    
    console.log(id)
   const data = await userModel.deleteOne({_id:id})
    res.send({success:true, message:" date delete succssfuly", data : data})
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Failed to update data" });
    }

})

mongoose.connect("mongodb://127.0.0.1:27017/miaad")

.then(()=>{
    console.log("connect to DB ")

    app.listen(PORT,()=>console.log("server is running "))
})
.catch((err)=>console.log(err))