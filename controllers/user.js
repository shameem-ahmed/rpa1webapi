var jwt = require('jwt-simple');
var moment = require('moment');

var User = require('../models/user').User;
var Request = require('../models/user').Request;

module.exports = {

    register: function (req, res) {
        console.log("user.register");

        User.findOne({
            email: req.body.email
        }, function (err, existingUser) {

            if (existingUser)
                return res.status(409).send({
                    message: 'Use name is already registered'
                });

            var mUser = {
                name: req.body.name,
                email: req.body.email,
                pwd: req.body.password,
                isActive: true
            };

            var user = new User(mUser);

            user.save(function (err, result) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                }

                var t1 = createToken(result);

                console.log('token:');
                console.log(t1);

                res.status(200).send({
                    token: t1
                });
            })
        });
    },

    login: function (req, res) {
        console.log('user.login');
        console.log(req.body);

        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (!user)
                return res.status(401).send({
                    message: 'Email or password invalid'
                });

            if (req.body.password == user.pwd) {

                console.log(req.body, user.pwd);

                res.send({
                    token: createToken(user)
                });
            } else {
                return res.status(401).send({
                    message: 'Invalid name or password'
                });
            }
        });
    },

    createRequest: function (req, res) {
        console.log("user.createRequest");

        var mRequest = {
            user: req.user,
            time: req.body.time,
            type: req.body.type,
            title: req.body.title,
            search1: req.body.search1,
            search2: req.body.search2,
            search3: req.body.search3,
            country: req.body.country,
            filter: req.body.filter,
            isActive: true
        };

        console.log("mRequest:");
        console.log(mRequest);


        var request1 = new Request(mRequest);

        request1.save(function (err, result) {
            if (err) {
                res.status(500).send({
                    message: err.message
                });
            }

            res.status(200).send({
                request: result
            });
        });
    },

    getLoginRequests: function (req, res) {
        console.log('user.getRequests');
        var userId = req.user;

        Request.find({ user: userId }).exec(function (err, data) {

            if (!data)
                return res.status(401).send({ message: 'Requests not found' });

            res.send(data);
        })
    },

    getLogin: function (req, res) {
        console.log('user.getLogin');
        var id = req.user;

        console.log(id);

        User.findById(id, function(err, data) {

            if (!data)
                return res.status(401).send({ message: 'User not found' });

            res.send(data);

        });
    }

}

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, 'secret');

}
