const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    

}, { strict: false });

module.exports = mongoose.model('Grab', LogSchema);
// {
// 	grab: mongoose.model('Grab', LogSchema),
// 	propinsi : mongoose.model('Propinsi', LogSchema)
// }