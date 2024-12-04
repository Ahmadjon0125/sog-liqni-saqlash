const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(bodyParser.json())

const pateintRoutes = require('./routes/patients')
const appointmentsRoutes = require('./routes/appoinments')

app.use(pateintRoutes)
app.use(appointmentsRoutes) 


// Serverni ishga tushirish
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`)
})