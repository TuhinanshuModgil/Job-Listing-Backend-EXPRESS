// --------Read Me----------
// file to handle all the routes for jobs

import express from "express"
import { Job } from "../models/job.model.js";

const router = express.Router()

// route for saving a job description
router.post('/', async (req,res)=>{

    try {
        if (
            !req.body.role ||
            !req.body.description ||
            !req.body.company ||
            !req.body.location||
            !req.body.stipend
          ){

            return res.status(400).send({
                message: 'Send all required fields: role, company, location, stipend',
              });
          }

          const newJob = {
            role: req.body.role,
            description: req.body.description,
            company: req.body.company,
            location: req.body.location,
            stipend: req.body.stipend,
            logo: req.body.logo?req.body.logo:"",

          }

          const job = await Job.create(newJob)

          return res.send(job)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }

})

// route for getting all books from server
router.get('/', async(req, res)=>{

    try {

        const jobs = await Job.find({})

        return res.status(200).send(
            {
                count: jobs.length,
                data: jobs
            }
        )
        
    } catch (error) {
        console.log(error.message)

        return res.status(500).send({
            message: error.message
        })
    }
})



router.get('/tester', async(req, res)=>{

    try {

        

        return res.status(200).send(
            {

                data: "Tester Endpoint"
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

        const job = await Job.findById(id)

        return res.status(200).send(job)
        
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
        
        // if (
        //     !req.body.role ||
        //     !req.body.description ||
        //     !req.body.company ||
        //     !req.body.location||
        //     !req.body.stipend
        //   ){

        //     return res.status(400).send({
        //         message: 'Send all required fields: role, company, location, stipend',
        //       });
        //   }
          console.log(req.body)
        //   console.log("Reached here 1")
          
          const {id} = req.params;
          
          const updateJob =await Job.findByIdAndUpdate(id, req.body)
        //   console.log("Reached here 2")
          
          if(!updateJob){
              return res.status(404).send({
                  message: "Job not found"
                })
            }
            
            // console.log("Reached here 3")
         return res.status(200).send({
            message: "Job updated successfully"
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

        const result = await Job.findByIdAndDelete(id)

        if(!result){
            return res.status(400).send({
                message:"Failed to delete the Job"
            })
        }

        return res.status(200).send({
            message: "Job deleted successfully"
        })


    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            message: error.message
        })
    }
})

export default router
