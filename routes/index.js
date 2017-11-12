var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;




var client = new Client();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/getUfcGameList', function (req, res, next) {
    client.get("http://ufc-data-api.ufc.com/api/v1/us/events", function (data, response) {
        res.json({'result': data});
    });
});

router.get('/getOctagonGirls', function (req, res, next) {
    client.get("http://ufc-data-api.ufc.com/api/v3/iphone/octagon_girls", function (data, response) {
        res.json(data);
    });
});


router.get('/getOctagonGirls/:id', function (req, res, next) {

    var id = req.params.id;

    client.get("http://ufc-data-api.ufc.com/api/v3/iphone/octagon_girls/"+ id, function (data, response) {
        res.json(data.gallery);
    });
});

//http://ufc-data-api.ufc.com/api/v1/us/fighters

router.get('/getFighters', function (req, res, next) {
    var id = req.params.id;

    client.get("http://ufc-data-api.ufc.com/api/v3/iphone/fighters", function (data, response) {
        res.json(data);
    });
});


router.get('/getFightersByName/:id', function (req, res, next) {
    var searchTerm = req.params.id;

    client.get("http://ufc-data-api.ufc.com/api/v3/iphone/fighters", function (data, response) {

        console.log(data);

        var _data=[];

        data.forEach(function(entry) {

            console.log(entry.last_name.toLowerCase());

            var _elementOne =entry.first_name.toLowerCase()+ " "+  entry.last_name.toLowerCase();

            if (_elementOne.indexOf(searchTerm.toLowerCase()) != -1) {
                _data.push(entry);
            }



        });

        res.json(_data);
    });
});





router.get('/getFighters/:id', function (req, res, next) {

    var id = req.params.id;

    client.get("http://ufc-data-api.ufc.com/api/v3/iphone/fighters/"+ id, function (data, response) {
        res.json(data);
    });
});


module.exports = router;
