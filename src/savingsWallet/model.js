import {Schema, model} from 'mongoose';
import {LVCBALANCE,LVCLOCKBALANCE} from '../myWallet/const';

const savingsWalletSchema = new Schema({

    balance: {
        type: Number,
        enum: LVCBALANCE,
        default: LVCBALANCE[0]  
    },

    userId: {         /* *stores the userId of the user */  
        type: String,
        required: true
    },

    isLocked:{
        type: Number,
        enum: LVCLOCKBALANCE,
        default: LVCLOCKBALANCE[0]
    },

    date: {     
        type: Date,
        default: Date.now
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

module.exports = model("savingsWallet", savingsWalletSchema);

