var express = require('express');
import {ROLES} from './const';
var router = express.Router();
import {facebookAuth} from './facebook';
import {googleAuth} from './google';
var controller = require('./controller');

const authenticator = require('../helper/auth');

/*
When a user SignUp the request goes to the add function in controller.
*/
router.post('/sign-up', (req, res, next) => { 
    if(req.body.role && req.body.role.toLowerCase() === ROLES[0].toLowerCase()) return res.status(401).json({ data: 'can not create admin' });
    return controller.add(req).then((result) => {
        if (result==='email exist')
        return res.status(401).json({ data: result });
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.get('/getUserEmailBy',(req, res, next) => {
    return controller.getUserEmailBy().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

// router.post('/addReferalLink',(req, res, next) => {
//     return controller.addReferalLink(req.body).then((response) => {
//         return res.status(200).json({ message: 'Success' });
//     }).catch((err) => {
//         next(err);
//     }); 
// });

/*
This url confirm the the email of the user.
And changes the status of the SignUp
*/
router.post('/confirmEmail', (req, res, next) => {
    return controller.confirmEmail(req.body).then((response) => {
        return res.status(200).json({ message: response });
    }).catch((err) => {
        next(err);
    }); 
});

/*
*fetches the status of the email send to the user while sigup(to check either
 user confirm the mail or not)
*/
router.get('/getConfirmMailStatus', (req, res, next)=>  {
    return controller.getConfirmMailStatus().then((response) => {
        return res.status(200).json({data:response });
    }).catch((err) => {
        next(err);
    }); 
});

/*
validate() called in controller to validate the user on login.
*/
router.post('/login', (req, res, next) => {    
    return controller.validate(req.body).then((response) => {
        if (response==="user does not exist" || response==="incorrect password" )
        return res.status(400).json({ data : response});
        return res.status(200).json({ data: response });
    }).catch((err) => {
        next(err);
    });
});

router.post('/facebook_auth',facebookAuth);
router.post('/google_auth',googleAuth);


/*
logOut() called in controller.
*/
router.post('/sign-out', (req, res, next) => {
    return controller.logOut(req.body.id).then((response) => {
        return res.status(200).json({ message: 'Logout Succesfully' });
    }).catch((err) => {
        next(err);
    }); 
});

/*
fetches all the users list. 
*/
router.get('/getAll',function(req, res, next) {
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

/*
getUsersType() returns roles of the user(like individual or admin).
*/
router.get('/getUserTypes', authenticator.validateToken, function(req, res, next) {
    return controller.getUsersType().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

/*
getUsersById() returns users details by its id.
*/
router.get('/getUsersById/:id', function(req, res, next) {
    return controller.getUsersById(req.params.id).then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

/*
delete() returns status of the users as false.
*/
router.delete('/delete/:id', authenticator.validateToken, (req, res, next) => {
    return controller.delete(req.params.id)
            .then((success) => res.status(200).send('User deleted'))
            .catch((err) => next(err));
});

/*
*changes the password of the user.
*/
router.post('/changePassword', (req, res, next) => {
    return controller.changePassword(req.body).then((response) => {
        return res.status(200).json({ message: 'password changed' });
    }).catch((err) => {
        next(err);
    }); 
});

/*
*validates the token.
*/
router.get('/validateToken', authenticator.validateToken, (req, res, next)=>  {
        return res.status(200).json({ data: 'validate token' });
});

/*
*fetches the user status 
*/
router.get('/getUserStatus', authenticator.validateToken, (req, res, next)=>  {
    return controller.getUserStatus().then((response) => {
        return res.status(200).json({data:response });
    }).catch((err) => {
        next(err);
    }); 
});

/*
*sends emails to the user to reset their password.
*/
router.post('/sendForgetEmail', (req, res, next) => {
    return controller.sendForgetEmail(req.body).then((response) => {
        return res.status(200).json({ data:response  });
    }).catch((err) => {
        next(err);
    }); 
});

/*
*validates the id in the url of the resetPassword email link.
*/
router.post('/validateForgotEmail', (req, res, next) => {
    return controller.validateForgotEmail(req.body).then((response) => {
        return res.status(200).json({ message: response });
    }).catch((err) => {
        next(err);
    }); 
});

module.exports = router;