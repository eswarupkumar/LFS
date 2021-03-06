const mongoose=require("mongoose")

const Schema=mongoose.Schema
const CategorySchema= new Schema({
    name:{
        type:String,
        required:true,
        index:{
            unique:true,
        }
    },
    description:{
        type:String,
        required:false,
    },
    type:{
        type:String,
        required:true
    },
    itemPictures: [
        { img: { type: String, required:false } }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref:"SignUpSchema",
        required:true
    }
},{timestamps:true})

const postitem=mongoose.model('PostItem',CategorySchema)
const requestitem=mongoose.model('RequestItem',CategorySchema)
module.exports = {
    postitem: postitem,
    requestitem: requestitem
}