const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const saltRounds = 10;

const users = require('./model');
const { STATUS, ROLES } = require('./const');
const { decodeString } = require('../helper/sendGridEMail');

const usersDbHelper = {};
const defaultPassword = 'crptox123#';

import {
    addUser
} from '../profile/controller';

/*
Here the save function takes the usersInput and save the users data.
and the status of the user is initailly pending.
*/
usersDbHelper.save = async (usersInput) => {
    try {
        return users.countDocuments({ email: usersInput.email }).then((count) => {
            if (count === 0) {
               
                usersInput.password = usersInput.password || defaultPassword;
                return bcrypt.hash(usersInput.password, saltRounds).then((encryptedPassword) => {

                    // const referalLink  = '';
                    // console.log(referalLink);

                    let newUser = JSON.parse(JSON.stringify(usersInput));
                    newUser.password = encryptedPassword;
                    // newUser.referalLink = referalLink;


                    const obj = new users(newUser);
                    obj.save().then(() => { 
                       
                        return obj; });
                       
                        addUser(usersInput,obj._id);
                        return obj;
                });


            } else {
                return 'email exist';
            }
        });

    } catch (err) {
        return Promise.reject(err);
    }
}

usersDbHelper.getUserEmailBy = async () => {
    try {
        return users.find({})
            .exec()
            .then((results) => {
                return results.map((result) => {
                    return {
                        email: result.email
                    }
                });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


/*
find() fetches all the users list.
*/
usersDbHelper.getAll = async () => {
    try {
        return users.find({})
            .select("-password","-__v")
            .then((results) => {
                return results.map((result) => {
                    return result;
                });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
findOne() find the user on login matches its credentials and on successfull match sign() 
generates a token.
*/
usersDbHelper.validate = async (model) => {
    try {
        return users.findOne({ email: model.email }).exec().then((u) => {
         
            if (u) {
                const payload = {
                    userName: u.name,
                    id: u._id,
                    email: u.email,
                    firstname: u.firstname,
                    lastname: u.lastname,
                    userStatus: u.userStatus,
                    active: u.active,
                    createdDate: u.createdDate,
                    modifiedDate: u.modifiedDate,
                    role: u.role
                };
                const options = { expiresIn: '1d', issuer: 'https://lvchubs.com'};

                const secret = ""+ process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);
                const match = bcrypt.compareSync(model.password, u.password);
                if (match) {
                    return u.updateOne({ token }).then(() => {

                        return { match, token, payload };
                    });
                }
                return ("incorrect password" );
            }
            return ("user does not exist");
        });

    } catch (err) {
        return Promise.reject(err);
    }
}
/*
update() updates the user active status to false.
*/
usersDbHelper.delete = async (id) => {
    try {
        await users.update({ _id: id }, { active: false });
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
updateOne() takes id of the user and sets token as null.
*/
usersDbHelper.logOut = async (id) => {
    try {
        await users.updateOne({ _id: id }, { $set: { token: null } });
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
find() fetches the user details by its id.
*/
usersDbHelper.getUsersById = async (id) => {
    try {
        return await users.find({ _id: id })
            .exec()
            .then((results) => {
                return results.map((result) => {
                    return {
                        email: result.email,
                        firstname: result.firstname,
                        lastname: result.lastname,
                        userStatus: result.userStatus,
                        active: result.active,
                        _id: result.id,
                        createdDate: result.createdDate,
                        modifiedDate: result.modifiedDate
                    }
                });
                // return results.length === 1 ? results[0] : null;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
*find() finds the user by its email id.
*/
usersDbHelper.getUsersByEmail = async (email) => {
    try {
        return await users.find({ "email": email })
            .exec()
            .then((results) => {
                return results.length === 1 ? results[0] : {};
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

usersDbHelper.getUsersIdByEmail = async (email) => {
    try {
        return await users.find({ "email": email })
            .exec()
            .then((results) => {
                return results.length === 1 ? results[0]._id : {};
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


/*
*updateOne() updates the user password.
*/
usersDbHelper.changePassword = async (decodeId, body) => {
    try {
        const id = decodeId;
        const password = body.password;
        return bcrypt.hash(password, saltRounds).then(async (encryptedPassword) => {
            return await users.updateOne({ _id: id }, { $set: { password: encryptedPassword } });
        });

    } catch (err) {
        return Promise.reject(err);
    }
}
/*
id recieved is matched and the userstatus changes to "confirm".
*/
usersDbHelper.confirmEmail = async (id) => {
    try {
        await users.updateOne({ _id: id }, { $set: { userStatus: STATUS[1] } });
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
*finds all active users excluding admin
*/
usersDbHelper.getActiveStatus = async () => {
    try {
        return users.find({ "active": true })
            .exec()
            .then((results) => {
                return results.filter(res => (res.role !== ROLES[0]));
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = usersDbHelper;
