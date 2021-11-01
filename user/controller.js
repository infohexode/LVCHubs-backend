import {INPROGRESS, ROLES, STATUS, 
    CONFIRMEMAILSTATUS,PASSWORDRESTSUCESSFULLY} from './const';
import {sendMail,signUpOption, decodeString, 
    confirmMailOption, resetPasswordOption,
    passwordUpdateOption} from '../helper/sendGridEMail';

const dbHelper = require('./dbHelper');

const users = {};

/*
The add fuction takes the request and call the save function
A mail is send by the function sendMail to the user to confirm the email.
*/
users.add = async (req) => {
    try {
        const res = await dbHelper.save(req.body);
        const userInfo = await dbHelper.getUsersByEmail(req.body.email);
        await sendMail(signUpOption(userInfo));
        return res;
    } catch (err) {
        return Promise.reject(err);
    }
}


users.getUserEmailBy = async () => {
    try {
        return await dbHelper.getUserEmailBy();
    } catch (err) {
        return Promise.reject(err);
    }
}

// users.addReferalLink = async (body) => {
//     try {
//         // const url = `${process.env.frontEndHttpPath}/ref/`;
//         // console.log(url);
//         return await dbHelper.addReferalLink(body);
    
//     } catch (err) {
//         return Promise.reject(err);
//     }
// }

/*
*adds the admin and sets status is confirm.
*and save function called in dbHelper.
*/
users.addAdmin = async () => {
    try {
        const firstname = process.env.adminUsername;
        const password = process.env.adminPassword;
        const role = ROLES[0];
        const email = process.env.adminEmail;
        const phone = process.env.adminPhone;

        const body = {
            email,password,
            firstname,role,
            active:true,
            userStatus:STATUS[1],
            phone
        }
        return await dbHelper.save(body);
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
confirms the users email by validating the users id and sendMail() sends a confirmation mail
to the user.
*/
users.confirmEmail = async (body) => {
    try {
        const decodedId = decodeString(body.id.toString());
        const userInfo =  await users.validateDecodeUserId(body.id);
        if(!userInfo) return CONFIRMEMAILSTATUS.userNotExist;
        if(userInfo.userStatus === STATUS[1]) return CONFIRMEMAILSTATUS.alreadyEmailIsConfirm;
        await dbHelper.confirmEmail(decodedId);
        await sendMail(confirmMailOption(userInfo));
        return CONFIRMEMAILSTATUS.successfullyEmailUpdate;
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
*returns the confirmMailStatus.
*/
users.getConfirmMailStatus = async () => {
    try {
        return CONFIRMEMAILSTATUS;
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
*validateDecodeUserId() decodes the id of the reset password email url when user clicks on it.
*getUsersById() fetches the user info by this id.(whether the user exits or not).
*/
users.validateDecodeUserId = async(id) =>{
    const decodedId = decodeString(id.toString());
    const userInfo = await dbHelper.getUsersById(decodedId);
    return userInfo;
}

/*
*validates the id of the user.
*/
users.validateForgotEmail = async(body) =>{
    const userInfo = users.validateDecodeUserId(body.id);
    if(!userInfo) return CONFIRMEMAILSTATUS.userNotExist;
    return userInfo;
}

/*
getAll() called in dbHelper.
*/
users.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
takes model of the user as parameter to validates the user.
*/
users.validate = async (model) => {
    try {
        return await dbHelper.validate(model);
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
delete() called in dbHelper.
*/
users.delete = async (id) => {
    try {
        return await dbHelper.delete(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
return roles of the user.
*/
users.getUsersType = async () => {
    return ROLES;
}

/*
logOut() called in dbHelper.
*/
users.logOut = async (id) => {
    try {
        return await dbHelper.logOut(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
getUsersById() called in dbHelper.
*/
users.getUsersById = async (id) => {
    try {
        return await dbHelper.getUsersById(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
getUsersById() first finds the user by its id.
decodeString() decode id of the user.
sendMail() sends a confirmation mail to the user after succesfull password reset.
*/
users.changePassword = async (body) => {
    try {
        const decodedId = decodeString(body.id.toString());
        const userInfo = await dbHelper.getUsersById(decodedId);
        if(!userInfo) return CONFIRMEMAILSTATUS.userNotExist;
        await dbHelper.changePassword(decodedId,body);
        await sendMail(passwordUpdateOption(userInfo));
        return PASSWORDRESTSUCESSFULLY;
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
*return the user status.
*/
users.getUserStatus = async () => {
    try {
        return [INPROGRESS,INPROGRESS];
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
*getUsersByEmail() first finds the user by its email.
*sendMail() sends email to the user to reset the password.
*/
users.sendForgetEmail = async (body) => {
    try {
        const userInfo = await dbHelper.getUsersByEmail(body.email);
        await sendMail(resetPasswordOption(userInfo));
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
 * getActiveStatus() called in dbHelper. 
 */
users.getActiveStatus = async () => {
    try {
        return await dbHelper.getActiveStatus();
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = users;