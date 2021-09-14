var mongoose = require('mongoose');
Schema = mongoose.Schema

var  adminSchema =  new Schema(

    { //_id: Schema.Types.ObjectId ,
        
        
        adminname: {
        type: String,
        required: true
                 },
        adminpass: {
            type: String,
            required: true
        },
        
       

    }
    
)

module.exports = mongoose.model('Adminr', adminSchema );