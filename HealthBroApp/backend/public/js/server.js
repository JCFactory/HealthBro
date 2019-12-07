var express = require("express")
var app = express()
var mongoose = require("mongoose")

app.use(express.static(__dirname))

var conString = "mongodb://127.0.0.1:27017/chats"

var Chat = mongoose.model("Chat", {
  message: String,
  timestamp: { type: Date, default: Date.now }
})

mongoose.connect(conString, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  console.log("Database connection", err)
  saveData()
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

function saveData(message) {
  var chat = new Chat(message);
  chat.save();
}

app.listen(3020, () => {
  console.log("Well done, now I am listening...")
})


