// -------------Read me----------------
// This is the main file of the server that uses express to create the backend 
// We have added middlewares and route handling using the express app


import express from "express"
import mongoose from 'mongoose'
// import { DATABASE_URL, PORT } from "./config.js"
// import { Book } from "./models/book.model.js"
// import bookRouter from "./routes/books.routes.js"
import jobRouter from "./routes/jobs.routes.js"
import cors from "cors"

import dotenv from 'dotenv/config'


// This code was used to configure the dotenv file but due to the latest release with es6 compatibility we dont need this
// dotenv.config({
//     path: './env'
// })





const app = express()

// middleware to parse any incoming JSON data 
app.use(express.json())



// allows all requests to the serve
// In a professional we would define the address that could make the request to our server
app.use(cors())



// allows for custom addresses
// app.use(cors({
//     origin: 'https://localhost:5173',
//     meathods: ['GET', 'PUT', 'POST', 'DELETE']
// }))


// Just to check if process.env is working
// console.log(process.env.PORT)


// Just to return a welcome message when someone connects to the root path
app.get('/', (req, res)=>{
console.log(req)
return res.status(234).send("Welcome To Job-Listing API. go to '/jobs' to access the job-listing data. Go to readme for more details")

})


// This tell that send the request comming to the /jobs path to the jobRouter
// Go to job router file to see how the requests are handled
app.use('/jobs', jobRouter)



// Here we use mongoose to connect to our database 
// once that is completed we finally start listening to the requests on our server
mongoose
    .connect(process.env.DATABASE_URL)
    .then(()=>{
    console.log("app connected to databse")

    app.listen(process.env.PORT||7000, ()=>{
        console.log(`server running at ${process.env.PORT||7000}`)
    })
    })
    .catch((err)=>{
    console.log(err)
    })

export default app
