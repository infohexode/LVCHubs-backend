import {Schema, model} from 'mongoose';
import {LVCBALANCE,LVCLOCKBALANCE} from './const';

const myWalletSchema = new Schema({

    date: {     
        type: Date,
        default: Date.now
    },
    lvcLocked:{
        type: Number,
        // enum: LVCLOCKBALANCE,
        // default: LVCLOCKBALANCE[0]
        default: LVCLOCKBALANCE
    },
    LvcBalance: {
        type: Number,
        // enum: LVCBALANCE,
        // default: LVCBALANCE[0]  
        default: LVCBALANCE
    },
    // type: {         
    //     type: String
        
    // },
    // status: {
    //     type: String
       
    // },
    // paymentamount: {       
    //     type: Number   
    // },
    // transactionId: {       
    //     type: String
    // },
    // proofOfPayment : {
    //     type: String
    // },

    // crypto: {      
    //     type: Number
       
    // },
    // note: {       
    //     type: String
       
    // },
    // information: {      
    //     type:String
    // },
    // username: {         
    //     type: String
        
    // },
    userId: {         /* *stores the userId of the user */  
        type: String,
        required: true
    },
    active: {         /* *by default it stores the entries, which active status is true */  
        type: Boolean,
        default: true
    },
    createdDate: {        
        type: Date,
        default:  Date.now
    },
    modifiedDate: {     /* *stores on which date, the particular transaction is modified or updated */
        type: Date,
        default: Date.now
    }
});

module.exports = model("myWallet", myWalletSchema);

