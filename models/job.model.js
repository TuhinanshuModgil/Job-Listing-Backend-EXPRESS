import mongoose  from "mongoose";

const jobSchema  = mongoose.Schema({

    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    stipend:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:false
    },


},
{
    timestamps: true
})

export const Job = mongoose.model('Job', jobSchema)

