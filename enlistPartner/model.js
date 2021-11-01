import {Schema, model} from 'mongoose';
import { STATUS } from './const';

const enlistPartnerSchema = new Schema({
    title: { 
        type: String,
        required: true
    },  
    firstname: {             
        type: String,
        required: true
    },
    lastname: {             
        type: String,
        required: true
    },
    phoneNumber: {             
        type: Number,
        required: true
    },
    email: {             
        type: String,
        required: true
    },
    comapanyName: {             
        type: String,
        required: true
    },
    typeofBussiness: {             
        type: String,
        required: true
    },
    websiteUrl: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    Address: {          /* *stores address of the user */
        type: String,
        required: true
    },
    state: {            /* *stores on which state the user lives */
        type: String,
        required: true
    },
    city: {            /* *stores city of the user */ 
        type: String,
        required: true
    },
    logo: {    
        type: String
    },
    nationality: {      /* *stores country name of the user */
        type: String
    },
    companyDetails: {
        type: String
    },
    keyGoals: {
        type: String
    },
    hearAboutUs: {
        type: String
    },
    status: {       
        type: String,
        enum: STATUS,
        default: STATUS[0]
    },
    comment: {         /* *it stores a reason on kyc rejection */     
        type: String,
        default: false
    },
    userId: {         /* *stores the userId of the user */  
        type: String,
        required: true
    },
    active:{            /* *by default the active status of the entries is true */
        type:Boolean,
        default:true
    },
    createdDate:{       /* *stores on which date, the particular entry is added  */ 
        type:Date,
        default: Date.now
    },
    modifiedDate:{          /* *stores on which date, the particular entry is modified or updated */  
        type:Date,
        default: Date.now
    }

});

module.exports = model("enlistPartner",enlistPartnerSchema);
