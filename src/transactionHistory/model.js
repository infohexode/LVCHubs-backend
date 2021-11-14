import {Schema, model} from 'mongoose';
import {LVCBALANCE,LVCLOCKBALANCE} from '../myWallet/const';

const transactionHistorySchema = new Schema({

    date: {               
        type: Date,
        default: Date.now
    },

    description: {
        type: String        /*stores the balance credited/debited by user or by interest  */
    },

    withdrawls: {
        type: Number
    },

    deposit: {
        type: Number
    },

    balance: {
        type: Number,
        enum: LVCBALANCE,
        default: LVCBALANCE[0]  
    },

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

module.exports = model("transactionHistory", transactionHistorySchema);
