import express from "express"
import { Book } from "../models/book.model.js";

const router = express.Router()

// route for saving a book
router.post('/', async (req,res)=>{

    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
          ){

            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
              });
          }

          const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,

          }

          const book = await Book.create(newBook)

          return res.send(book)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

})

// route for getting all books from server
router.get('/', async(req, res)=>{

    try {

        const books = await Book.find({})

        return res.status(200).send(
            {
                count: books.length,
                data: books
            }
        )
        
    } catch (error) {
        console.log(error.message)

        return res.status(500).send({
            message: error.message
        })
    }
})

// route for getting a single book by ID
router.get('/:id', async(req, res)=>{

    try {

        const {id} = req.params;

        const book = await Book.findById(id)

        return res.status(200).send(book)
        
    } catch (error) {
        console.log(error.message)

        return res.status(500).send({
            message: error.message
        })
    }
})

// route to update a book 
// we will need the body and also the book id
router.put('/:id', async (req, res)=>{
    try {
        
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
          ){

            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
              });
          }
          console.log(req.body)
          console.log("Reached here 1")
          
          const {id} = req.params;
          
          const updatedBook =await Book.findByIdAndUpdate(id, req.body)
          console.log("Reached here 2")
          
          if(!updatedBook){
              return res.status(404).send({
                  message: "Book not found"
                })
            }
            
            console.log("Reached here 3")
         return res.status(200).send({
            message: "Book updated successfully"
         })

        
    } catch (error) {
        console.log(error.message)

        return res.status(500).send({
            message:error.message
        })
    }
})

// route to delete a book
router.delete('/:id', async (req, res)=>{
    try {
        
        const {id} = req.params

        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(400).send({
                message:"Failed to delete the book"
            })
        }

        return res.status(200).send({
            message: "Book deleted successfully"
        })


    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            message: error.message
        })
    }
})

export default router
