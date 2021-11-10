const dbHelper = require('./dbHelper');
const savingsWallet = {};

savingsWallet.getBalance = async () => {
    try {
        return await dbHelper.getBalance();
    } catch (err) {
        return Promise.reject(err);
    }
}

// savingsWallet.updateBalance = async (req) => {
//     try {
//         return await dbHelper.updateBalance(req.body);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// }


module.exports = savingsWallet;