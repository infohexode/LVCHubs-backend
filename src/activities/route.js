var express = require('express');

var router = express.Router();
var controller = require('./controller');
import upload from '../helper/upload';
const authenticator = require('../helper/auth');

router.post('/add',(req, res, next) => {
    return controller.add(req).then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.post('/update',(req, res, next) => {
    return controller.update(req.body)
            .then((success) => (res.status(200).json('Successfully updated')))
            .catch((err) => next(err));
});

router.delete('/delete/:id', (req, res, next) => {
    return controller.delete(req.params.id)
            .then((success) => res.status(200).send('Entry Deleted'))
            .catch((err) => next(err));
});

router.get('/getAll', (req, res, next) =>{
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

module.exports = router;