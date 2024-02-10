const mongoose = require("mongoose");

const createExperience = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    diplome: {
        type: String,
        required: true,
    },
});

createExperience.methods.toLocalString = function () {
    return this.created_at.toLocalString();
};

module.exports = mongoose.model("Experience", createExperience);
