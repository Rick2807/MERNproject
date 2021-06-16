//1. import express
const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')

//2. create the server 
const app = express();

//2.5 connect to db
conectarDB()

//run cors
app.use(cors())

//Activate express.json to read data from the user 
app.use( express.json({extended: true}) )

//3. select the port on which the app will run 
const PORT = process.env.PORT || 4000; 

//3.5 import routes 
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

//4. run the app
app.listen(PORT, ()=>{
    console.log(`the app is running on port ${PORT}`)
})