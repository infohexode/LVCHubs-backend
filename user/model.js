import {Schema, model} from 'mongoose';
import { ROLES, STATUS } from './const';

const userSchema = new Schema({
    email: {        /* *stores the email id of the user */
        type: String,
        // required: true
    },
    password: {     /* *stores the password of the user */
        type: String,
        // required: true
    },
    firstname: {         /* *stores the name of the user */
        type: String,
       // required: true
    },
    lastname: {         /* *stores the name of the user */
        type: String
    },


    socialMediaName: { type: String }, /*stores the socialMediaName of the user*/
    socialMediaId: { type: String },  /*stores the socialMediaId of the user*/
    imageUrl: { type: String }, /*stores the image of the user*/


    //...admin, business, individual
    role: {     /* *stores the role of the user when they signUp or SignIn as("admin","individual","corporate") */
        type: String,
        enum: ROLES
    },
    token: {        /* *assigns a token on succussful login */
        type: String
    },
    //...soft delete
    active: {     /* *by default it stores the entries, which active status is true */  
        type: Boolean,
        default: true
    },
    createdDate: {      /* *stores on which date, the particular entry is added  */  
        type: Date,
        default: Date.now
    },
    userStatus: {       /* *stores the userStatus either("pending","confirm") when they first signUp */
        type: String,
        enum: STATUS,
        default: STATUS[0]
    },
    modifiedDate: {     /* *stores on which date, the particular entry is modified or updated */
        type: Date,
        default: Date.now
    }

});

// export default 
module.exports = model("user", userSchema);
