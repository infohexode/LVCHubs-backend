import axios from 'axios';
const adminWallet = require('./model');
const _ = require('lodash');
const adminWalletDbHelper = {};
adminWalletDbHelper.getAdminWalletBalance = async () => {
    try {
        return adminWallet.find({})
        .exec()
        .then((results) => {
            return results
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
module.exports = adminWalletDbHelper;