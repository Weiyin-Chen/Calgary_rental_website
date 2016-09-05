var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    address: [Number],
    sum: Number,
    title: [String],
    price: [String],
    description: [String],
    contact: [String]
},{ collection: 'info' });

module.exports = mongoose.model('user', UserSchema);