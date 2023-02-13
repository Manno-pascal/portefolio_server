const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    password: {
        type: String,
        required: [true, 'Pas de mot de passe'],
    },

})

const LoginModel = mongoose.model('logins', loginSchema);

module.exports = LoginModel