var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/getBalance',(req, res, next) => {
    return controller.getBalance().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.post('/deposit', (req, res, next) => {  
    return controller.deposit(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.post('/withdraw', (req, res, next) => {  
    return controller.withdraw(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});


module.exports = router;
