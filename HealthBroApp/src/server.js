// server.jsconst express = require('express');
const bodyParser = require('body-parser');
var express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
// Connect to mongoDB databaseconst
mongoURL = 'mongodb://127.0.0.1:27017/chats';
mongoose.connect(mongoURL, { useNewUrlParser: true });// Routing
// Configure port
const port = 8080;// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);

// Routing
router.get('/', (request, response) => {
  response.status(200).send({ message: 'Hello World!' })//Set app to use express backend router
});
app.use(router);
