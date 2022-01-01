var express = require('express');
var router = express.Router();

import controller from './controller';

import authenticator from '../helper/auth';
import upload from '../helper/upload';


// router.post('/add',authenticator.validateToken,(req, res, next)=>{
//     upload.setFilesStoragePath([ 
//         process.env.profilePhotoStoragePath
//         ]);
//     next();
//     },
//     upload.saveImage, (req, res, next) => {
//     return controller.add(req).then((result) => {
//         return res.status(200).json({ data: result });
//     }).catch((err) => next(err));
// });


router.post('/update',authenticator.validateToken,(req, res, next)=>{
        upload.setFilesStoragePath([ 
            process.env.profilePhotoStoragePath
            ]);
         next();
         },
       upload.saveImage, (req, res, next) => {
    return controller.update(req)
            .then((success) => (res.status(200).json('Successfully updated')))
            .catch((err) => next(err));
});



router.get('/getProfileById/:id', (req, res, next) => {
    return controller.getProfileById(req.params.id).then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});


router.get('/getAll', (req, res, next) =>{
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});


module.exports = router;