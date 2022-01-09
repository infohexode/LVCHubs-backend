import {Schema, model} from 'mongoose';
// import { STATUS } from './const';

const profileSchema = new Schema({
    firstname: {            
        type: String,
        required: true
    },
    lastname: {             
        type: String,
        required: true
    },
    phoneNumber: {             
        type: String,
        //required: true
    },
    affiliateCode: {
        type: Number   
    },
    title: { 
        type: String,
      
    },
    DOB: {              /* *stores date of birth of the user */
        type: Date,
        
    },
    Address: {          /* *stores address of the user */
        type: String,
        
    },
    postalCode: {       /* *stores pincode of the user */
        type: Number,
       
    },
    state: {            /* *stores on which state the user lives */
        type: String,
        
    },
    city: {            /* *stores city of the user */ 
        type: String,
        
    },
    profilePhoto: {    /* *stores the profile image of the user */
        type: String
    },
    nationality: {      /* *stores country name of the user */
        type: String
    },
    userId: {         /* *stores the userId of the user */  
        type: String,
        required: true
    },
    createdDate: {          /* *stores on which date, the particular entry is added  */  
        type: Date,
        default: Date.now
    },
    modifiedDate: {    /* *stores on which date, the particular entry is modified or updated */
        type: Date,
        default: Date.now
    },
    active: {        /* *by default it stores the entries, which active status is true */
        type: Boolean,
        default: true
    }
    
});

module.exports = model("profile", profileSchema);