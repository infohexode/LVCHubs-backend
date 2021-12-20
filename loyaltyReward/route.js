var express = require('express');
var router = express.Router();

var controller = require('./controller');

const authenticator = require('../helper/auth');

router.post('/add',authenticator.validateToken,(req, res, next) => {  
    return controller.add(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.get('/getAll',authenticator.validateToken,(req, res, next) => {
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.get('/getLoyaltyById/:id',authenticator.validateToken, (req, res, next) => {
    return controller.getLoyaltyById(req.params.id).then((results) => {
        console.log(results);
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.post('/updateStatus',authenticator.validateToken,(req, res, next) => {
    return controller.updateStatus(req.body).then((response) => {
        return res.status(200).json({ message: response });
    }).catch((err) => {
        next(err);
    }); 
});








module.exports = router;