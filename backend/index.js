const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http  = require('http')
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app)
const port = process.env.PORT;
//?Middle wair
app.use(cors({ origin: '*' }))
app.use(bodyParser.json());
//? setting static folder path

const URL = process.env.MONGO_URL;

async function connectDB(){
    try {
      mongoose.connect(URL);

     
      const connection = mongoose.connection
  
      connection.on('connected',()=>{
          console.log("Successfully connected to database")
      })
  
      connection.on('error',(error)=>{
          console.log("Error connecting to database because",error)
      })
          
  } catch (error) {
      console.log("Something is wrong ",error)
  }
  
  }

  module.exports = connectDB;

/*
mongoose.connect(URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));





*/
// Routes

app.use('/patients', require('./routes/patients'));



// Example route using asyncHandler directly in app.js
app.get('/', asyncHandler(async (req, res) => {
    res.json({ success: true, message: 'API working successfully', data: null });
}));

// Global error handler
app.use((error, req, res, next) => {
    res.status(500).json({ success: false, message: error.message, data: null });
});


connectDB().then(()=>{
    server.listen(port,()=>{
        console.log("server running at " + port)
    })
  })
