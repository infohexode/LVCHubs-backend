var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/getAdminWalletBalance',(req, res, next) => {
    return controller.getAdminWalletBalance().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

router.post('/add', (req, res, next) => {  
    return controller.add(req).then((result) => {
        return res.status(200).json({ data: "saved" });
    }).catch((err) => next(err));
});

module.exports = router;
