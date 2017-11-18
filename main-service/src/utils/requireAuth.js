const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

module.exports = function (roles) {
    return function (req, res, next) {
        if (!roles) {
            next();
        } else {
            const requestToken = getTokenFromHeader(req);
            if (requestToken) {
                jwt.verify(requestToken, config.jwtSecret, (err, data) => {
                    if (err) {
                        res.sendStatus(403);
                    } else {
                        if (data.roles.some((v, i) => roles.indexOf("*") > -1 || roles.indexOf(v) > -1)) {
                            next();
                        } else {
                            res.sendStatus(403);
                        }
                    }
                });
            } else {
                res.sendStatus(403);
            }
        }
    };
};

function getTokenFromHeader(req) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        return bearerToken;
    }
    return null;
}