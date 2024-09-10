const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


// Debug log to ensure the MONGO_URI is loaded
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI:', process.env.MONGO_URI);

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use('/api/users', require('./routes/userRoutes'))

//Serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))

}
else {
    app.get('/',(req,res)=> res.send('please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started running on port ${port}`))