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
    age: {
        type: Number,
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
