import axios from 'axios';
const activities = require('./model');
const _ = require('lodash');
const activitiesDbHelper = {};

activitiesDbHelper.save = async (activitiesInput) => {
    try {
       
            const model = new activities(activitiesInput);   
            await model.save();  
            return 'saved';
    } catch (err) {
        return Promise.reject(err);
    }
}


activitiesDbHelper.update = async (activitiesInput) => {
    try {
        await activities.update({ _id:activitiesInput.id}, {link:activitiesInput.link
            ,name:activitiesInput.name,modifiedDate : Date.now()});
        
    } catch (err) {
        return Promise.reject(err);
    }
}

activitiesDbHelper.delete = async (id) => {
    try {
        await activities.update({ _id:id }, {active: false});
    } catch (err) {
        return Promise.reject(err);
    }
}


activitiesDbHelper.getAll = async () => {
    try {
        return activities.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = activitiesDbHelper;