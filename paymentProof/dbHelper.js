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

paymentProofDbHelper.getAll = async () => {
    try {
        return paymentProof.find({})
            .then((results) => {
                return results.map((result) => {
                    return result;
                });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


paymentProofDbHelper.getProofById = async (id) => {
    try {
        return await paymentProof.find({ _id: id })
            .exec()
            .then((results) => {
                return results.map((result) => {
                    return {
                        paymentAmount: result.paymentAmount,
                        paymentInfo: result.paymentInfo,
                        PaymentProofPhoto: result.PaymentProofPhoto,
                        userId: result.userId,
                        status: result.status,
                        createdDate: result.createdDate,
                        modifiedDate: result.modifiedDate,
                        active: result.active,
                        _id: result.id
                    }
                });
                
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = paymentProofDbHelper;

