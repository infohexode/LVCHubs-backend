import {Schema, model} from 'mongoose';
import { STATUS ,LVCBALANCE} from './const';

const loyaltyRewardSchema = new Schema({
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
    numberOfTokens: {            
        type: Number,
        required: true
    },
    userId: {         /* *stores the userId of the user */  
        type: String,
        required: true
    },
    lvcLocked:{
        type: Number,
        enum: LVCBALANCE,
        default: LVCBALANCE[0]
    },
    city: {            /* *stores city of the user */ 
        type: String,
        required: true
    },
    nationality: {           
        type: String,
        required: true
    },
    active:{            /* *by default the active status of the entries is true */
        type:Boolean,
        default:true
    },
    status: {       
        type: String,
        enum: STATUS,
        default: STATUS[0]
    },
    createdDate: {      /* *stores on which date, the particular entry is added  */  
        type: Date,
        default: Date.now
    }

});

// export default 
module.exports = model("loyaltyReward", loyaltyRewardSchema);
