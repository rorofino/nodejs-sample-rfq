const express = require('express');
const router = express.Router();

const User = require('./users');
const RFQ = require('./rfqs');

User.register(router, '/users');
RFQ.register(router, '/rfqs');

module.exports = router;
    