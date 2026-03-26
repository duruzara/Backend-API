const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"))

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
        });

        await newCat.save();

        res.redirect("/view-cats.html");

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


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


//start
app.listen(PORT, () => {
    console.log("API is listening on Port:", PORT)
})

