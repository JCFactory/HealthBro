var express = require("express")
var app = express()
var mongoose = require("mongoose")

app.use(express.static(__dirname))

var conString = "mongodb://127.0.0.1:27017/chats"

var Chats = mongoose.model("Chats", {
  name: String,
  chat: String
})

mongoose.connect(conString, (err) => {
  console.log("Database connection", err)
})

app.post("/chats", async (req, res) => {
  try {
    var chat = new Chats(req.body)
    await chat.save()
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
})

app.listen(3020, () => {
  console.log("Well done, now I am listening...")
})


