const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {type : "String", required: true},
    email: {type : "String", required: true},
    password: {type : "String", required: true},
    admin: {type : "Boolean"} 
})

module.exports = mongoose.model('User', userSchema);