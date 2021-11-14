const dbHelper = require('./dbHelper');
const activities = {};


activities.add = async (req) => {
    try {
        return await dbHelper.save(req.body);
    } catch (err) {
        return Promise.reject(err);
    }
}


activities.update = async (body) => {
    try {
        return await dbHelper.update(body);
    
    } catch (err) {
        return Promise.reject(err);
    }
}

activities.delete = async (id) => {
    try {
        return await dbHelper.delete(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

activities.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = activities;