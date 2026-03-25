const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const errorMSG = {}
const status = {}
app.use(express.urlencoded({extended:true}))
app.get("/api/server/status", (req,res) =>{
status.msg = "Server is up and ready";
res.json(status)
})
app.post("/api/submit-cat", async(req,res) => {
main(res.req.body.catName)
})
app.listen(PORT, ()=> {
console.log("API is listening on Port: ", PORT)
})
async function main(kittenName) {
await mongoose.connect('mongodb+srv://Duru-Zara-DB:EQWAsU26HhspVqTq@cluster0.4cwtf68.mongodb.net/?appName=Cluster0')

const kittySchema = new mongoose.Schema({name:String})
const kitten = new mongoose.model('Kitten', kittySchema)
const kitty1 = new kitten({name: kittenName})
console.log(kitty1.name)
kitty1.save()
}

// main()

/* const express = require('express'); //import module
const app = express(); //creating a constructor
const PORT = 3000;

app.get("/hello-api", (req, res)=>{
    res.send("Hello World, welcome to JS backend programming!")
});

app.get("/hello-api-json", (req, res)=>{
    res.send({greetings:"Hello world!, from backend and server side!"})
});

app.listen(PORT, ()=>{
    console.log("Hello world API app listening on port "+PORT)
})

const errorMsg={};
const status={};
app.use(express.urlencoded({ extended: true}))
app.get("/api/server/status", async(req, res) =>{
    const query = req.query;
    status.msg =""
    //abeg complete ts later
}) */

