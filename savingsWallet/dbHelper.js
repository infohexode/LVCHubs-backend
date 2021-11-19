import axios from 'axios';
import { getloyaltyPoint, getLvcLockedBalance } from '../myWallet/controller';
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

savingsWalletDbHelper.deposit = async() => {
    try {
        const balance = await getloyaltyPoint();
        const lockedBalance = await getLvcLockedBalance(); 
        const sw = await savingsWalletDbHelper.getBalance();
        const myb = balance - lockedBalance;
        const swb = sw + lockedBalance;
        return{
            myb,
            swb
        };
    } catch (error) {
        return Promise.reject(error);
    }
}

savingsWalletDbHelper.withdraw = async() => {
    try {
        const balance = await getloyaltyPoint();
        const lockedBalance = await getLvcLockedBalance(); 
        const sw = await savingsWalletDbHelper.getBalance();
        const myb = balance + lockedBalance;
        const swb = sw - lockedBalance;
        return{
            myb,
            swb
        };
    } catch (error) {
        return Promise.reject(error);
    }
}

export const interest = async () => {
    try {
        const interest_ = await getBalance();
        const rate = process.env.rate;
        const time = process.env.time;
        const int_amt = ((interest_*rate*time)/100);
        return int_amt;
 
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = savingsWalletDbHelper;