const mongoose = require("mongoose");

const createProjet = mongoose.Schema({
    name: {
        "fr": { type: String, required: true },
        "en": { type: String, required: true },
    },
    description: {
        "fr": { type: String, required: true },
        "en": { type: String, required: true },
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        "fr": { type: String, required: true },
        "en": { type: String, required: true },
    },
    githubLink: {
        type: String,
        required: true,
    },
    demoLink: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],
        required: true,
    },
});

createProjet.methods.toLocalString = function () {
    return this.created_at.toLocalString();
};

module.exports = mongoose.model("Projet", createProjet);
