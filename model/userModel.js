const Mongoose = require('mongoose');
const timeStamps = require('mongoose-timestamp')
require('../config/database')
const hapiUserSchema = new Mongoose.Schema({  
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
});
hapiUserSchema.plugin(timeStamps);
const User = Mongoose.model("Users",hapiUserSchema)
module.exports = User