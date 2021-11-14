import axios from 'axios';
const vacationActivities = require('./model');
const _ = require('lodash');
const vacationActivitiesDbHelper = {};

vacationActivitiesDbHelper.save = async (activitiesInput) => {
    try {
       
            const model = new vacationActivities(activitiesInput);   
            await model.save();  
            return 'saved';
    } catch (err) {
        return Promise.reject(err);
    }
}


vacationActivitiesDbHelper.update = async (activitiesInput) => {
    try {
        await vacationActivities.update({ _id:activitiesInput.id}, {url:activitiesInput.url
            ,name:activitiesInput.name,modifiedDate : Date.now()});
        
    } catch (err) {
        return Promise.reject(err);
    }
}

vacationActivitiesDbHelper.delete = async (id) => {
    try {
        await vacationActivities.update({ _id:id }, {active: false});
    } catch (err) {
        return Promise.reject(err);
    }
}


vacationActivitiesDbHelper.getAll = async () => {
    try {
        return vacationActivities.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}



module.exports = vacationActivitiesDbHelper;