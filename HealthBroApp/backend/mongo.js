'use strict';
var express = require("express");
var mongo = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser'); // parser for post requests

var mongo = express();

// Bootstrap application settings
mongo.use(express.static('./public')); // load UI from public folder
mongo.use(bodyParser.json());
mongo.use(express.static(__dirname))
var database = "mongodb://127.0.0.1:27017/chats"

mongoose.Promise = global.Promise;
mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true });

mongo.post("/chats", function (req, res) {
  var chat = mongoose.model("Chat", {
    message: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now }
  })
  var textIn = '';

  if (req.body.input) {
    textIn = req.body.input.text;
    console.log('textin', textIn);
  }

  var payload = {
    input: {
      text: textIn
    }
  };
  console.log('payload', payload);

  try {
    var chat = new Chat(payload.input);
    chat.save()
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  }
});

module.exports = mongo;
