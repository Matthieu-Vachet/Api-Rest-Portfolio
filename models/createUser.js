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
        type: String,
        required: true,
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
        type: String,
        required: true,
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

createUser.methods.toLocalString = function () {
    return this.created_at.toLocalString();
};

module.exports = mongoose.model("User", createUser);
