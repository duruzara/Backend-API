const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Connect to MongoDB (Connect once, not inside function)
mongoose.connect(
'mongodb+srv://Duru-Zara-DB:EQWAsU26HhspVqTq@cluster0.4cwtf68.mongodb.net/?appName=Cluster0'
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// Schema
const kittySchema = new mongoose.Schema({
    name: String
})

// Model
const Kitten = mongoose.model('Kitten', kittySchema)


// SERVER STATUS
app.get("/api/server/status", (req, res) => {
    res.json({ msg: "Server is up and ready" })
})


//Create cat
app.post("/api/submit-cat", async (req, res) => {
    try {
        const newCat = new Kitten({
            name: req.body.catName
        })

        await newCat.save()

        res.json({
            msg: "Cat saved successfully",
            cat: newCat
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


//Read
app.get("/api/cats", async (req, res) => {
    try {
        const cats = await Kitten.find()

        res.json({
            count: cats.length,
            cats: cats
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


//Update
app.put("/api/update-cat/:id", async (req, res) => {
    try {
        const updatedCat = await Kitten.findByIdAndUpdate(
            req.params.id,
            { name: req.body.catName },
            { new: true }
        )

        res.json({
            msg: "Cat updated",
            cat: updatedCat
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


//Delete
app.delete("/api/delete-cat/:id", async (req, res) => {
    try {
        await Kitten.findByIdAndDelete(req.params.id)

        res.json({
            msg: "Cat deleted successfully"
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/", (req, res) => {
res.send(`
<h1>Cat API</h1>
<p>Server is working!</p>

<form action="/api/submit-cat" method="POST">
<input type="text" name="catName" placeholder="Enter Cat Name"/>
<button type="submit">Add Cat</button>
</form>

<br>

<a href="/api/cats">View All Cats</a>
`)
})

//start
app.listen(PORT, () => {
    console.log("API is listening on Port:", PORT)
})

/* const express = require('express')
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
}*/

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

