const express = require('express')
require('dotenv').config();
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
const port = process.env.PORT || 3002


const teacherRoutes = require('./src/routes/teacher.routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send("Welcome to the teachers application")
})

app.use('/api/v1/teachers', teacherRoutes)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})