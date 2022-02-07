require('dotenv').config()
require('express-async-errors')

const express = require('express')
const mongoose = require('mongoose')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not_found')
const productRouter = require('./routes/products')

const app = express()
const port = process.env.PORT || 3001
//middleware
app.use(express.json())

app.get('/', (req,res)=>{
    return res.send('<h1>Store Api</h1>')
})

app.use('/api/v1/products', productRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const startServer = async ()=>{

    await mongoose.connect(process.env.MONGO_URI)
    app.listen(port, ()=>{
        console.log(`app is listening at port:${port}`)
    })
}
startServer().catch(err=>{console.log(err.message)})