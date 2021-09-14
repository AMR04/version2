var mongoose = require('mongoose')
var Schema = mongoose.Schema


var deviceSchema= new Schema({

   // _id: {type :Schema.Types.ObjectId },

    devicename: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    state: {
        type:Boolean,
        //required: true
    },
    image: {
        type: String,
        required: true
    },
    bluename: {
        type: String,
 
    },

    blueadress: {
        type: String,
 
    },
    version: {
          type: String,
        required: true
        
      },
    current: {
        type:String,
        //required: true
    },
    
    speed: {
        type: String,
        //required: true
    } , 

    temperature :{
        type: String,
        //required: true
    } , 
    humidity:{
        type: String,
        //required: true
    } , 
    battery :{
        type: String,
        //required: true
    } , 
  
    user: [{
        type: Schema.Types.ObjectId,
       
          ref: 'User'
      }],



})

module.exports = mongoose.model('Device', deviceSchema)