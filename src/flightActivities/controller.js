const dbHelper = require('./dbHelper');
const flightActivities = {};


flightActivities.add = async (req) => {
    try {
        return await dbHelper.save(req.body);
    } catch (err) {
        return Promise.reject(err);
    }
}


flightActivities.update = async (body) => {
    try {
        return await dbHelper.update(body);
    
    } catch (err) {
        return Promise.reject(err);
    }
}

flightActivities.delete = async (id) => {
    try {
        return await dbHelper.delete(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

flightActivities.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = flightActivities;