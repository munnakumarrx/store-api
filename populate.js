require('dotenv').config()

const mongoose = require("mongoose");

const product = require('./models/products')
const productJson = require('./products.json')


const start = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    await product.deleteMany()
    await product.create(productJson)
    console.log("Success")
    process.exit(0)
}
start().catch(err=>{
    console.log(err.message)
    process.exit(1)
})