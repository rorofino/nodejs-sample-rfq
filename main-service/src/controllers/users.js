const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports.signin = function (req, res, next) {
    const {login, password} = req.body;
    if (req.body.login != null && req.body.password != null) {
        User.find({ login: req.body.login, active: true }, (err, users) => {
            if (err) {
                res.send('Error while fetching database');
            }
            if (users.length > 0) {
                const user = users[0];
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    user.lastLogin = new Date();
                    new User(user).save((err)=>{
                        if (err) {
                            console.log("Error updating user.");
                        }
                    });
                    // then return a token, secret key should be an env variable
                    const token = jwt.sign({ id: user.id, email: user.email, roles: user.roles }, config.jwtSecret);
                    res.json({
                        message: 'Authenticated! Use this token in the "Authorization" header',
                        token: token,
                        user: { 
                            id: user._id, 
                            name: user.name,
                            email: user.email,
                            roles: user.roles
                        }
                    });
                }
            } else {
                res.status(400).send('Invalid user/password.');
            }
        });
    }
};

module.exports.signup = function (req, res, next) {
    
};

module.exports.resetPassword = function (req, res, next) {
    
};

module.exports.signoff = function (req, res, next) {
    
};