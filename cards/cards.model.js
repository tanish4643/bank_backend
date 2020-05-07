const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cardno: { type: String, unique: true, required: true, maxlength: 8, minlength: 8 },
    pin: { type: String, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    amount: { type: Number, default: 0}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cards', schema);