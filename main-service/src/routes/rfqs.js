const checkPermisions = require('../utils/requireAuth');

//Models
const RFQ = require('../models/rfq');

//Controllers
const rfqsController = require('../controllers/rfqs');

RFQ.methods([
    { method: 'get', before: checkPermisions(['*']) },
    { method: 'post', before: checkPermisions(['*']) },
    { method: 'put', before: checkPermisions(['*']) },
    { method: 'delete', before: checkPermisions(['*']) }
]);

RFQ.route('validate', {
    method: 'post', 
    handler: rfqsController.validate
});

module.exports = RFQ;