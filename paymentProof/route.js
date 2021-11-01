var express = require('express');
var router = express.Router();

import controller from './controller';

import authenticator from '../helper/auth';
import upload from '../helper/upload';

router.post('/add',authenticator.validateToken,(req, res, next)=>{
    upload.setFilesStoragePath([ 
        process.env.PaymentProofStoragePath
        ]);
    next();
    },
    upload.saveImage, (req, res, next) => {
    return controller.add(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});


router.post('/updateStatus',(req, res, next) => {
    return controller.updateStatus(req.body).then((response) => {
        return res.status(200).json({ message: response });
    }).catch((err) => {
        next(err);
    }); 
});






module.exports = router;