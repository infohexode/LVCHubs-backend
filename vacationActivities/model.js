import {Schema, model} from 'mongoose';

const vacationActivitiesSchema = new Schema({
    name: {             /* *stores the name of the user */
        type: String,
        required: true
    },
    url: {
        type : String
    },
    Description: {
        type : String
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

module.exports = model("vacationActivities",vacationActivitiesSchema);
