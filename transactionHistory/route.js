var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/get',(req, res, next) => {
    return controller.get().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

module.exports = router;
