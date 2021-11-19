const dbHelper = require('./dbHelper');
const transactionHistory = {};

transactionHistory.get = async () => {
    try {
        return await dbHelper.get();
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = transactionHistory;