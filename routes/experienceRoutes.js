const express = require("express");
const router = express.Router();
const Experience = require("../models/createExperience");

/**
 * @typedef Experience
 * @property {string} title.required - Le titre de l'expérience
 * @property {string} school.required - Le nom de l'école
 * @property {string} location.required - L'emplacement de l'école
 * @property {string} startDate.required - La date de début de l'expérience
 * @property {string} endDate.required - La date de fin de l'expérience
 * @property {string} description.required - La description de l'expérience
 * @property {string} diplome.required - Le diplôme obtenu
 */

/**
 * Récupère toutes les expériences
 * @route GET /Api/v1/experiences/
 * @group Expériences - Opérations sur les expériences
 * @returns {Array.<object>} 200 - Un tableau d'expériences
 * @returns {Error} 400 - ID expérience non valide
 * @returns {Error} 500 - Problème de connexion à la base de données ou autre erreur serveur
 */

router.get("/", async (req, res) => {
    try {
        const experiences = await Experience.find();
        return res.send(experiences);
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID expérience non valide" });
        } else if (error.name === "MongoNetworkError") {
            return res.status(500).send({ message: "Problème de connexion à la base de données" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la récupération des expériences",
            });
        }
    }
});

/**
 * Crée une nouvelle expérience
 * @route POST /Api/v1/experiences/create
 * @group Expériences - Opérations sur les expériences
 * @param {Experience.model} experience.body.required - Les informations de l'expérience à créer
 * @returns {string} 201 - Nouvelle expérience créée avec succès
 * @returns {Error} 400 - Erreurs de validation
 * @returns {Error} 500 - Erreur serveur lors de la création de l'expérience
 */
router.post("/create", async (req, res) => {
    try {
        const experience = new Experience({
            title: req.body.title,
            school: req.body.school,
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description,
            diplome: req.body.diplome,
        });
        await experience.save();
        return res.status(201).send("Nouvelle expérience créée avec succès");
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            return res.status(400).send({ message: "Erreurs de validation" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la création de l'expérience",
            });
        }
    }
});

/**
 * Met à jour une expérience
 * @route PUT /Api/v1/experiences/update/{id}
 * @group Expériences - Opérations sur les expériences
 * @param {string} id.path.required - L'ID de l'expérience à mettre à jour
 * @param {Experience.model} experience.body.required - Les informations de l'expérience à mettre à jour
 * @returns {string} 200 - Expérience mise à jour avec succès
 * @returns {Error} 400 - ID expérience non valide
 * @returns {Error} 404 - Expérience non trouvée
 * @returns {Error} 500 - Problème de connexion à la base de données ou autre erreur serveur
 */
router.put("/update/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const update = req.body;
        const experience = await Experience.findOneAndUpdate(query, update);
        if (!experience) {
            return res.status(404).send({ message: "Expérience non trouvée" });
        }
        return res.status(200).send("Expérience mise à jour avec succès");
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID expérience non valide" });
        } else if (error.name === "MongoNetworkError") {
            return res.status(500).send({ message: "Problème de connexion à la base de données" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la mise à jour de l'expérience",
            });
        }
    }
});

/**
 * Supprime une expérience
 * @route DELETE /Api/v1/experiences/delete/{id}
 * @group Expériences - Opérations sur les expériences
 * @param {string} id.path.required - L'ID de l'expérience à supprimer
 * @returns {string} 200 - Expérience supprimée avec succès
 * @returns {Error} 400 - ID expérience non valide
 * @returns {Error} 404 - Expérience non trouvée
 * @returns {Error} 500 - Problème de connexion à la base de données ou autre erreur serveur
 */
router.delete("/delete/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const experience = await Experience.findOneAndDelete(query);
        if (!experience) {
            return res.status(404).send({ message: "Expérience non trouvée" });
        }
        return res.status(200).send("Expérience supprimée avec succès");
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID expérience non valide" });
        } else if (error.name === "MongoNetworkError") {
            return res.status(500).send({ message: "Problème de connexion à la base de données" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la suppression de l'expérience",
            });
        }
    }
});

module.exports = router;
