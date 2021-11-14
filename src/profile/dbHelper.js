const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const profile = require('./model');

const profileDbHelper = {};


profileDbHelper.save = async (profileInput) => {
    try {
        const model = new profile(profileInput);   
        await model.save();    
    } catch (err) {
        return Promise.reject(err);
    }
}


profileDbHelper.update = async (id,ProfileInput) => {
    try {
        await profile.updateOne({ _id:id}, {phone:ProfileInput.phone
            ,profilePhoto:ProfileInput.profilePhoto,modifiedDate : Date.now()});
        
    } catch (err) {
        return Promise.reject(err);
    }
}



profileDbHelper.getProfileById = async (id) => {
    try {
        return await profile.find({"_id":id, "active":true })
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

profileDbHelper.getAll = async () => {
    try {
        return profile.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = profileDbHelper;