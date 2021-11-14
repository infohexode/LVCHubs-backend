import {Schema, model} from 'mongoose';
import {LVCBALANCE} from '../myWallet/const';

const adminSchema = new Schema({

    balance: {
        type: Number
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

module.exports = model("admin", adminSchema);