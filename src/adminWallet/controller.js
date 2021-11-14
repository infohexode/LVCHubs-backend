const dbHelper = require('./dbHelper');
const adminWallet = {};

adminWallet.getAdminWalletBalance = async () => {
    try {
        return await dbHelper.getAdminWalletBalance();
    } catch (err) {
        return Promise.reject(err);
    }
}

adminWallet.add = async (req) => {
    try {
        return await dbHelper.save(req.body);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = adminWallet;