const dbHelper = require('./dbHelper');
const vacationActivities = {};


vacationActivities.add = async (req) => {
    try {
        return await dbHelper.save(req.body);
    } catch (err) {
        return Promise.reject(err);
    }
}


vacationActivities.update = async (body) => {
    try {
        return await dbHelper.update(body);
    
    } catch (err) {
        return Promise.reject(err);
    }
}

vacationActivities.delete = async (id) => {
    try {
        return await dbHelper.delete(id);
    } catch (err) {
        return Promise.reject(err);
    }
}


vacationActivities.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = vacationActivities;