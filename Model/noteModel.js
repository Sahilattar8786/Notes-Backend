const mongoose=require("mongoose");

const noteSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Content:{
        type:String,
        require:true
    },
    Category:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }

},
{
    timestamps:true
}
)

const Note=mongoose.model("Note",noteSchema)

module.exports=Note;