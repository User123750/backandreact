var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require('cors');
const multer = require("multer");
var app = Express();
app.use(cors());
var CONNECTION_STRING = "mongodb+srv://Rihab:KRrQ7T0BGKsgL2YU@cluster0.djvbkfg.mongodb.net/"


var DATABASENAME = "Test";
var database;
app.listen(5040, () => {
    Mongoclient.connect(CONNECTION_STRING, (error, client) => {
      database = client.db(DATABASENAME);
      console.log("Mongo DB connection mezeyana");
    });
  });
  
app.get("/api/projetOne/getNotes", (request, response) => {
    database.collection("projetOne").find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send("Error retrieving notes from database.");
        } else {
            response.send(result);
        }
    });
});


app.post("/api/projetOne/AddNotes",multer().none(),(request,response)=>{
    database.collection('projetOne').count({},function(error,numOFDocs){
        database.collection("projetOne").insertOne({
            id:(numOFDocs+1).toString(),
            description:request.body.newNotes

        });
        response.json("added succesfully");
    })
})
app.delete("/api/projetOne/deleteNotes",(request,response)=>{
    database.collection('projetOne').deleteOne({
        id:request.query.id
    });
    response.json("deleted succesfully")
});