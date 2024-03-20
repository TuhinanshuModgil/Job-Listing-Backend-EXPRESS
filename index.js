
import express from "express"
import mongoose from 'mongoose'
// import { DATABASE_URL, PORT } from "./config.js"
// import { Book } from "./models/book.model.js"
// import bookRouter from "./routes/books.routes.js"
import jobRouter from "./routes/jobs.routes.js"
import cors from "cors"

import dotenv from 'dotenv'


dotenv.config({
    path: './env'
})





const app = express()

app.use(express.json())

// allows all requests
app.use(cors())

// allows for custom addresses
// app.use(cors({
//     origin: 'https://localhost:5173',
//     meathods: ['GET', 'PUT', 'POST', 'DELETE']
// }))

console.log(process.env.PORT)

app.get('/', (req, res)=>{
console.log(req)
return res.status(234).send("Welcome Here")
})

// app.use('/books', bookRouter)
app.use('/jobs', jobRouter)



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


