const mongoose = require("mongoose");

const createExperience = mongoose.Schema({
    title: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
    },
    school: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
    },
    location: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
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
        fr: { type: String, required: true },
        en: { type: String, required: true },
    },
    diplome: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
    },
    technologies: {
        type: [String],
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

createExperience.methods.toLocalString = function () {
    return this.created_at.toLocalString();
};

module.exports = mongoose.model("Experience", createExperience);
