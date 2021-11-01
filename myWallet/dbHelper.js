import axios from 'axios';
const myWallet = require('./model');
const _ = require('lodash');
const myWalletDbHelper = {};
const xlsxFile = require('read-excel-file/node');


myWalletDbHelper.save = async (WalletInput) => {
    try {
        const model = new myWallet(WalletInput);   
        await model.save();     

    } catch (err) {
        return Promise.reject(err);
    }
}

myWalletDbHelper.withdraw = async (balance) => {
    try {
        return await myWallet.updateOne({ $set: { loyaltyPoint: balance } });
    } catch (err) {
        return Promise.reject(err);
    }
}

myWalletDbHelper.getloyaltyPoint = async () => {
    try {
        return myWallet.find({})
        .exec()
        .then((results) => {
            return results.map((result) => {
                return {
                    loyaltyPoint: result.loyaltyPoint
                }
            });
        });
    } catch (err) {
        return Promise.reject(err);
    }
}


myWalletDbHelper.walletSummary = async () => {
    try {
        return myWallet.find({})
        .exec()
        .then((results) => {
            return results
        });
    } catch (err) {
        return Promise.reject(err);
    }
}




myWalletDbHelper.getuserId = async () => {
    try {
        return myWallet.find({})
        .exec()
        .then((results) => {
            return results.map((result) => {
                return {
                    userId: result.userId
                }
            });
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

myWalletDbHelper.updateLockedLvc = async (userid ,Tokens) => {
    try {
        await myWallet.updateOne({ userId:userid},{lvcLocked:Tokens});
    } catch (err) {
        return Promise.reject(err);
    }
}


// myWalletDbHelper.updateLvcBalance = async (userid ,Tokens) => {
//     try {
//         await myWallet.updateOne({ userId:userid},{lvcLocked:Tokens});
//     } catch (err) {
//         return Promise.reject(err);
//     }
// }







myWalletDbHelper.getLvcLockedBalance = async (userid) => {
    try {
        return myWallet.find({"userId":userid})
            .exec()
            .then((results) => {
                return results.map((result) => {
                    return {
                        lvcLocked: result.lvcLocked
                    }
                    });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}



myWalletDbHelper.getLvcLockedBalance = async (id) => {
    try {
        return await myWallet.find({"userId":id})
            .exec()
            .then((results) => {
                return results.map((result) => {
                return result;
                });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}




module.exports = myWalletDbHelper;