const {Schema, models, model}  = require('mongoose')

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
   
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    password:
        {
            type: String,
            required: true,
           
        }
    ,
    token: {
       type: String  
    },
    birthDate:{
        type: String,
       
    }, gender:{
        type: String,

    }, address:{
        type: String,
       
    }, occupation:{
        type: String,
       
    },
    emergencyContactName: {
        type: String  
     },
     emergencyContactNumber:{
         type: String,
        
     }, primaryPhysician:{
         type: String,
 
     }, insuranceProvider:{
         type: String,
        
     }, allergies:{
         type: String,
        
     },
},
    {
          timestamps: true
    }
);

export const User = models.User || model('User', UserSchema, 'users');
