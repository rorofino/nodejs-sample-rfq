const checkPermisions = require('../utils/requireAuth');

//Models
const User = require('../models/user');

//Controllers
const usersController = require('../controllers/users');

User.methods([
    { method: 'get', before: checkPermisions(['admin', 'dev']) },
    { method: 'post', before: checkPermisions(['admin', 'dev']) },
    { method: 'put', before: checkPermisions(['admin', 'dev']) },
    { method: 'delete', before: checkPermisions(['admin', 'dev']) }
]);

User.route('signin', {
    method: 'post', 
    handler: usersController.signin
});

User.route('signoff', {
    method: 'get', 
    before: checkPermisions(['*']), 
    handler: usersController.signoff
});

module.exports = User;