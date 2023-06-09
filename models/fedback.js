const mongoose=require("mongoose")


const reclamation= new mongoose.Schema(
{
    msg:{type:String},

    
},
{   
    timestamps:true
}
)
const feedbackmodel=mongoose.model("reclamation",reclamation)
module.exports= feedbackmodel ;