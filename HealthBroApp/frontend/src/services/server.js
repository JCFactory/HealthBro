const bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
const mongo = require('mongoose');

var db = mongo.connect('mongodb://127.0.0.1:27017/chats', function (err, response) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('connected to ' + db, ' + ', response);
  }
})

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  var db = mongo.connect('mongodb://127.0.0.1:27017/chats', function (err, response) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('connected to ' + db, ' + ', response);
    }
  })
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4300');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X.Requested-With, content-type');
  // res.setHeader('Access-Control-Allow-Credetials', true);
  next();
});

var Schema = mongo.Schema;
var ChatSchema = new Schema({
  name: {
    type: String
  },
  message: {
    type: String
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
});

var model = mongo.model('chats', ChatSchema, 'chats');

app.post('api/saveMessage', function (req, res) {
  var mod = new model(req.body);
  if (req.body.mode == 'Save') {
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send({ data: 'Record has been inserted.' });
      }
    });
  }
  else {
    model.findOneAndUpdate(req.body.id, { name: req.body.name, message: req.body.message, timeStamp: req.body.timeStamp }, function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({ data: 'Record has been updated' });
      }
    });
  }
})

app.post('api/deleteMessage', function (req, res) {
  model.remove({ _id: req.body.id }, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({ data: 'Message has been deleted.' });
    }
  })
});

app.get('api/getMessages', function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.listen(8080, function () {
  console.log('app listening on port 8080');
});


// const express = require('express');
// const bodyParser = require('body-parser');
// var path = require('path');
// const app = express();
// const router = express.Router();
// const mongoose = require('mongoose');

// // Connect to mongoDB databaseconst

// var Schema = mongoose.Schema;

// var ChatSchema = new Schema({
//   name: {
//     type: String
//   },
//   message: {
//     type: String
//   },
//   timeStamp: {
//     type: Date,
//     default: Date.now
//   },
// });



// mongoURL = 'mongodb://127.0.0.1:27017/chats';
// mongoose.connect(mongoURL, { useNewUrlParser: true });// Routing
// // Configure port
// const port = 8080;// Listen to port
// app.listen(port);
// console.log(`Server is running on port: ${port}`);

// // Routing
// router.get('/', (request, response) => {
//   response.status(200).send({ message: 'Hello World!' })//Set app to use express backend router
// });
// app.use(router);

