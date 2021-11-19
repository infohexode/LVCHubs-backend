const dbHelper = require('./dbHelper');
const savingsWallet = {};

savingsWallet.getBalance = async () => {
    try {
        return await dbHelper.getBalance();
    } catch (err) {
        return Promise.reject(err);
    }
}

savingsWallet.deposit = async () => {
    try {
        return await dbHelper.deposit();
    } catch (err) {
        return Promise.reject(err);
    }
}

savingsWallet.withdraw = async () => {
    try {
        return await dbHelper.withdraw();
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = savingsWallet;