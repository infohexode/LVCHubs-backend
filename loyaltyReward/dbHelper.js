const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const loyaltyReward = require('./model');
// const { STATUS, ROLES } = require('./const');

const loyaltyRewardDbHelper = {};


loyaltyRewardDbHelper.save = async (loyaltyRewardInput) => {
    try {
        const model = new loyaltyReward(loyaltyRewardInput);   
        await model.save();     

    } catch (err) {
        return Promise.reject(err);
    }
}

loyaltyRewardDbHelper.getAll = async () => {
    try {
        return loyaltyReward.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


loyaltyRewardDbHelper.getLoyaltyById = async (id) => {
    try {
        return await loyaltyReward.find({"userId":id, "active":true })
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

loyaltyRewardDbHelper.updateStatus = async (id, LoyaltyStatus) => {
    try {
        await loyaltyReward.updateOne({ _id:id }, {status: LoyaltyStatus 
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

loyaltyRewardDbHelper.getTokenById = async (id) => {
    try {
        return loyaltyReward.find({_id:id })
            .exec()
            .then((results) => {
                return results.map((result) => {
                    return {
                        numberOfTokens: result.numberOfTokens,
                        lvcLocked: result.lvcLocked
                    }
                    });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


loyaltyRewardDbHelper.updateLvc = async (id ,Balance,Tokens) => {
    try {
        await loyaltyReward.updateOne({ _id:id },{numberOfTokens:Balance ,lvcLocked:Tokens });
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = loyaltyRewardDbHelper;