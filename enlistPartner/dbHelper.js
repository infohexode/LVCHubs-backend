import axios from 'axios';
const enlistPartner = require('./model');
const _ = require('lodash');
const enlistPartnerDbHelper = {};

enlistPartnerDbHelper.save = async (enlistPartnerInput) => {
    try {
            const model = new enlistPartner(enlistPartnerInput);   
            await model.save();  
            return 'saved';
    } catch (err) {
        return Promise.reject(err);
    }
}


enlistPartnerDbHelper.update = async (enlistPartnerInput) => {
    try {
        await enlistPartner.updateOne({ _id:enlistPartnerInput.id}, {phoneNumber:enlistPartnerInput.phoneNumber
            ,firstname:enlistPartnerInput.firstname,modifiedDate : Date.now()});
        
    } catch (err) {
        return Promise.reject(err);
    }
}


enlistPartnerDbHelper.updateStatus = async (id, PartnerStatus , comment) => {
    try {
        await enlistPartner.updateOne({ _id:id }, {status: PartnerStatus , comment});
    } catch (err) {
        return Promise.reject(err);
    }
}

enlistPartnerDbHelper.delete = async (id) => {
    try {
        await enlistPartner.update({ _id:id }, {active: false});
    } catch (err) {
        return Promise.reject(err);
    }
}

enlistPartnerDbHelper.getPartnerById = async (id) => {
    try {
        return await enlistPartner.find({"_id":id, "active":true })
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


enlistPartnerDbHelper.getAll = async () => {
    try {
        return enlistPartner.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = enlistPartnerDbHelper;