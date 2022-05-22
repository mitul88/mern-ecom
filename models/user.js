const {Schema, model} = require("mongoose");
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, { timestamps: ture })