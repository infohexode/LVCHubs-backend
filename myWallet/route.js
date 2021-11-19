var express = require('express');

var router = express.Router();
var controller = require('./controller');
import upload from '../helper/upload';
const authenticator = require('../helper/auth');

/*
add function is called in controller.
*/
router.get('/deposit',(req, res, next) => {  
    return controller.add().then((result) => {
        return res.status(200).json({ data: "saved" });
    }).catch((err) => next(err));
});



router.post('/withdraw',(req, res, next) => {  
    return controller.withdraw(req.body).then((result) => {
        return res.status(200).json({ data: "saved" });
    }).catch((err) => next(err));
});


router.get('/getloyaltyPoint',(req, res, next) => {
    return controller.getloyaltyPoint().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});



router.get('/walletSummary',(req, res, next) => {
    return controller.walletSummary().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});



router.get('/getuserId',(req, res, next) => {
    return controller.getuserId().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.post('/getLvcLockedBalance',(req, res, next) => {  
    return controller.getLvcLockedBalance(req.body).then((result) => {
        return res.status(200).json({ data : results });
    }).catch((err) => next(err));
});

// router.get('/getLvcLockedBalance/:id', function(req, res, next) {
//     return controller.getLvcLockedBalance(req.params.id).then((results) => {
//         console.log(results);
//         return res.status(200).json({ data : results });
//     }).catch((err) => next(err));
// });

// router.get('/getMyWalletBalance',(req, res, next) => {
//     return controller.getMyWalletBalance().then((results) => {
//         return res.status(200).json({ data : results });
//     }).catch((err) => next(err));
// });


module.exports = router;