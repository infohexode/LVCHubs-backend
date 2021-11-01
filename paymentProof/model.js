import {Schema, model} from 'mongoose';
import { STATUS } from './const';

const paymentProofSchema = new Schema({
    paymentAmount: {             
        type: Number,
        required: true
    },
    paymentInfo: { 
        type: String,
        required: true
    },
    PaymentProofPhoto: {    
        type: String,
        required: true
    },
    userId: {         /* *stores the userId of the user */  
        type: String,
        required: true
    },
    status: {       
        type: String,
        enum: STATUS,
        default: STATUS[0]
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

module.exports = model("paymentProof", paymentProofSchema);