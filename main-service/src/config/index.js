module.exports.port = process.env.PORT || "3000";
module.exports.jwtSecret = process.env.JWT_SECRET || "kLmOr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w9z$C&F)J@Nc";
module.exports.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/altomar-main';
module.exports.mongoPort = process.env.MONGO_PORT || '27017';
module.exports.bCryptSaltRounds = process.env.BCRYP_SALT_ROUNDS || 10;
