const restful = require('node-restful');
const mongoose = restful.mongoose;

//Schema
const rfqSchema = new mongoose.Schema({
    active: { type: Boolean, required: true, default: true},
    number: { type: String, required: [true, 'Campo obrigatório'] },
});

rfqSchema.index({login:1, active:-1});


module.exports = restful.model('RFQ', rfqSchema);