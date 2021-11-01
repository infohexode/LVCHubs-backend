import axios from 'axios';
const flightActivities = require('./model');
const _ = require('lodash');
const flightActivitiesDbHelper = {};

flightActivitiesDbHelper.save = async (activitiesInput) => {
    try {
       
            const model = new flightActivities(activitiesInput);   
            await model.save();  
            return 'saved';
    } catch (err) {
        return Promise.reject(err);
    }
}


flightActivitiesDbHelper.update = async (activitiesInput) => {
    try {
        await flightActivities.update({ _id:activitiesInput.id}, {url:activitiesInput.url
            ,name:activitiesInput.name,modifiedDate : Date.now()});
        
    } catch (err) {
        return Promise.reject(err);
    }
}

flightActivitiesDbHelper.delete = async (id) => {
    try {
        await flightActivities.update({ _id:id }, {active: false});
    } catch (err) {
        return Promise.reject(err);
    }
}


flightActivitiesDbHelper.getAll = async () => {
    try {
        return flightActivities.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}



module.exports = flightActivitiesDbHelper;