const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    

}, { strict: false });

module.exports = mongoose.model('Grab', LogSchema);