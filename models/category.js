const {Schema, model} = require('mongoose');
const Joi = require('joi');

module.exports.Category = model('Category', Schema({
    name: {
        type: String,
        unique: true
    }
}, { timestamps: true }));