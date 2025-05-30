const mongoose =require('mongoose')
const Schema =mongoose.Schema

const anihubSchema = new Schema({
   Title: {
    type: String,
    required:true},

    About: {
     type: String,
     required:true},

    Note: {
     type: String,
     required:true},
},{timestamps:true})

const detail= mongoose.model('animedetail', anihubSchema );
module.exports=detail;