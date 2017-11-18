const restful = require('node-restful');
const mongoose = restful.mongoose;
const config = require('../config');
const bcrypt = require('bcrypt');

//Schema
const userSchema = new mongoose.Schema({
    active: { type: Boolean, required: true, default: true},
    login: { type: String, required: [true, 'Campo obrigatório'] },
    password: String,
    name: String,
    email: {type: String, required: [true, 'Campo obrigatório']},
    lastLogin: Date,
    roles: [],
    tempToken: String,
    tempTokenExpiration: Date
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, config.bCryptSaltRounds);
    next();
});

//ATENÇÃO: Arrow function nao funciona para esse findOne!
// userSchema.pre('findOneAndUpdate', function(next) {
//     this._update.password = bcrypt.hashSync(this._update.password, config.bCryptSaltRounds);
//     next();
// });


userSchema.index({login:1, active:-1});

userSchema.on('index', function(error) {
    if (error)
        console.log('Falha ao criar index no schema de user', error.message);
    else
        console.log('Index criado com sucesso no schema de usuarios');
});

var exportModel = restful.model('User', userSchema).updateOptions({ new: true });
exportModel.shouldUseAtomicUpdate = false;
module.exports = exportModel;

// module.exports = restful.model('User', userSchema).updateOptions({ new: true });