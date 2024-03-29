const mongoose = require("mongoose");

const createUser = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    profession: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
    },
    age: {
        type: Number,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    cp: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pays: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
    },
    number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

createUser.methods.toLocaleString = function () {
    return this.created_at.toLocaleString();
};

module.exports = mongoose.model("User", createUser);
