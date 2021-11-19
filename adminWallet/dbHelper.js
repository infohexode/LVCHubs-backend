import axios from 'axios';
const adminWallet = require('./model');
const _ = require('lodash');
import {sendMail,signUpOption, decodeString, 
    confirmMailOption, resetPasswordOption,
    passwordUpdateOption} from '../helper/sendGridEMail'
const adminWalletDbHelper = {};
adminWalletDbHelper.getAdminWalletBalance = async () => {
    try {
        return adminWallet.find({})
            .exec()
            .then((results) => {
                return results.map((result) => {
                return {
                    balance: result.balance
                }
            });
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

adminWalletDbHelper.save = async (adminWalletInput) => {
    try {
        const model = new adminWallet(adminWalletInput);
        await model.save();

    } catch (err) {
        return Promise.reject(err);
    }
}

export const checkBalance = async () => {
    try {
        const bal = await getAdminWalletBalance();
        if(bal < 500)
        {
            return sendMail(balanceLow());
        }
 

    } catch (error) {
        return Promise.reject(error);
    }
}
module.exports = adminWalletDbHelper;