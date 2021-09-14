var mongoose = require('mongoose');
Schema = mongoose.Schema

var  userSchema =  new Schema(

    { //_id: Schema.Types.ObjectId ,
        
        
        username: {
        type: String,
        required: true
                 },
        password: {
            type: String,
            required: true
        },
        
        email: {
            type: String,
           required: true
        },
   /*     rpass: {
            type: String,
            required: true
        },*/
        country: {
            type: String,
           // required: tru
        },

        phone:{
            type:Number},
      
      
       device: [{
                type: Schema.Types.ObjectId,
               
                  ref: 'Device'
              }],
      

    //    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },

    }
    
)

module.exports = mongoose.model('User', userSchema );