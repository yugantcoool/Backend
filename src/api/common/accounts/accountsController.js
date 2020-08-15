const express = require('express');

const router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { adminGuard } = require('../auth/aclService');
const config = require('../../../../config/default');

// All Account List
router.post('/accountList', adminGuard, function (req, res, next) {
    // var type = req.body.type ? req.body.type : 'member';
    req.db.collection("accounts").find().toArray(function (err, result) {
        if (err)
            res.json([]);
        else
            res.json(result);
    });
});

// Selected account details
router.post('/addAccount', function (req, res, next) {

    req.db.collection("accounts").insert(req.body, function (err, result) {
        if (err)
            res.json({});
        else
            res.json(result);
    });

});

// update account details
router.post('/updateAccount', function (req, res, next) {
    if (req.body._id != null) {
        var _id = ObjectID(req.body._id);
        var obj = req.body;
        delete obj._id;
        var myquery = { _id: _id };
        var newvalues = { $set: obj };
        req.db.collection("accounts").updateOne(myquery, newvalues, function (err, r) {
            if (err)
                res.json({ ack: false });
            else
                res.json({ ack: true });
        });
    } else res.json({ ack: false });
});

// delete account details
router.post('/deleteAccount', function (req, res, next) {
    if (req.body._id != null) {
        var _id = ObjectID(req.body._id);

        var myquery = { _id: _id };
        // var newvalues = { $set: obj };
        req.db.collection("accounts").remove(myquery, function (err, r) {
            if (err)
                res.json({ ack: false });
            else
                res.json({ ack: true });
        });
    } else res.json({ ack: false });
});

module.exports = router;