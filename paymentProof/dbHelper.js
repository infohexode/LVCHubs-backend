const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const paymentProof = require('./model');

const paymentProofDbHelper = {};

paymentProofDbHelper.save = async (paymentProofInput) => {
    try {
        const model = new paymentProof(paymentProofInput);   
        await model.save();    
    } catch (err) {
        return Promise.reject(err);
    }
}


paymentProofDbHelper.updateStatus = async (id, PaymentStatus) => {
    try {
        await paymentProof.updateOne({ _id:id }, {status: PaymentStatus});
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = paymentProofDbHelper;

