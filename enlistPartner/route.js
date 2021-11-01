var express = require('express');

var router = express.Router();
var controller = require('./controller');
import upload from '../helper/upload';
const authenticator = require('../helper/auth');

router.post('/add',authenticator.validateToken,(req, res, next)=>{
    upload.setFilesStoragePath([ 
        process.env.logoStoragePath
        ]);
    next();
    },
    upload.saveImage, (req, res, next) => {
    return controller.add(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.post('/update',(req, res, next) => {
    return controller.update(req.body)
            .then((success) => (res.status(200).json('Successfully updated')))
            .catch((err) => next(err));
});

router.post('/updateStatus',(req, res, next) => {
    return controller.updateStatus(req.body).then((response) => {
        return res.status(200).json({ message: response });
    }).catch((err) => {
        next(err);
    }); 
});

router.delete('/delete/:id', (req, res, next) => {
    return controller.delete(req.params.id)
            .then((success) => res.status(200).send('Entery Deleted'))
            .catch((err) => next(err));
});

router.get('/getPartnerById/:id', (req, res, next) => {
    return controller.getPartnerById(req.params.id).then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.get('/getAll', (req, res, next) =>{
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});





module.exports = router;