import axios from 'axios';
import { getLvcLockedBalance } from '../myWallet/controller';
import { getBalance } from './controller';
const savingsWallet = require('./model');
const _ = require('lodash');
const savingsWalletDbHelper = {};

savingsWalletDbHelper.getBalance = async () => {
    try {
        return savingsWallet.find({})
        .exec()
        .then((results) => {
            return results
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

// export const updateBalance = async() => {
//     try {
//         const balance = await getMyWalletBalance();
//         const lockedBalance = await getLvcLockedBalance(); 
//         const sw = await getBalance();
//         const myb = balance - lockedBalance;
//         const swb = sw + lockedBalance;

//         return{
//             myb,
//             swb

//         };
   
//     } catch (error) {
//         return Promise.reject(error);
//     }
// }
module.exports = savingsWalletDbHelper;