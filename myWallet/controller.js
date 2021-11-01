const dbHelper = require('./dbHelper');
const viewModel = require('./viewModel');
const myWallet = {};

/*
save function is called in dbHelper.
*/
myWallet.add = async (WalletInput) => {
    try {
        await dbHelper.save(WalletInput);
        return {msg:'saved'};
    } catch (err) {
        return Promise.reject(err);
    }
}


myWallet.withdraw = async (body) => {
    try {
        const walletInfo = await dbHelper.getloyaltyPoint();
        const leftamount = (walletInfo[0].loyaltyPoint);
        if(leftamount>0)
        {
            const balance = leftamount - body.redemptionPoint;
            return await dbHelper.withdraw(balance);
        }
        
    } catch (err) {
        return Promise.reject(err);
    }
}


myWallet.getloyaltyPoint = async () => {
    try {
        return await dbHelper.getloyaltyPoint();
    } catch (err) {
        return Promise.reject(err);
    }
}

myWallet.getuserId = async () => {
    try {
        return await dbHelper.getuserId();
    } catch (err) {
        return Promise.reject(err);
    }
}


myWallet.walletSummary = async () => {
    try {
        return await dbHelper.walletSummary();
    } catch (err) {
        return Promise.reject(err);
    }
}



myWallet.getLvcLockedBalance = async (body) => {
    try {
        return await dbHelper.getLvcLockedBalance(body);
    } catch (err) {
        return Promise.reject(err);
    }
}


myWallet.getLvcLockedBalance = async (id) => {
    try {
        return await dbHelper.getLvcLockedBalance(id);
    } catch (err) {
        return Promise.reject(err);
    }
}










module.exports = myWallet;