const express = require("express");
const router = express.Router();
const Projet = require("../models/createProjet");

/**
 * @typedef Projet
 * @property {string} name.required - Le nom du projet
 * @property {string} description.required - La description du projet
 * @property {string} imageUrl.required - L'url de l'image du projet
 * @property {string} category.required - La catégorie du projet
 * @property {string} githubLink.required - Le lien du projet sur GitHub
 * @property {string} demoLink.required - Le lien de démonstration du projet
 * @property {Array.<string>} technologies.required - Les technologies utilisées pour le projet
 */

/**
 * Récupère tous les projets
 * @route GET /Api/v1/projets/
 * @group Projets - Opérations sur les projets
 * @returns {Array.<object>} 200 - Un tableau de projets
 * @returns {Error} 400 - ID projet non valide
 * @returns {Error} 500 - Problème de connexion à la base de données ou autre erreur serveur
 */

router.get("/", async (req, res) => {
    try {
        const projets = await Projet.find();
        return res.send(projets);
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID projet non valide" });
        } else if (error.name === "MongoNetworkError") {
            return res.status(500).send({ message: "Problème de connexion à la base de données" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la récupération des projets",
            });
        }
    }
});

/**
 * Crée un nouveau projet
 * @route POST /Api/v1/projets/create
 * @group Projets - Opérations sur les projets
 * @param {Projet.model} projet.body.required - Les informations du projet à créer
 * @returns {string} 201 - Nouveau projet créé avec succès
 * @returns {Error} 400 - Erreurs de validation
 * @returns {Error} 500 - Erreur serveur lors de la création du projet
 */
router.post("/create", async (req, res) => {
    try {
        const projet = new Projet({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            category: req.body.category,
            githubLink: req.body.githubLink,
            demoLink: req.body.demoLink,
            technologies: req.body.technologies,
        });
        await projet.save();
        return res.status(201).send("Nouveau projet créé avec succès");
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            return res.status(400).send({ message: "Erreurs de validation" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la création du projet",
            });
        }
    }
});

/**
 * Met à jour un projet
 * @route PUT /Api/v1/projets/update/{id}
 * @group Projets - Opérations sur les projets
 * @param {string} id.path.required - L'ID du projet à mettre à jour
 * @param {Projet.model} projet.body.required - Les informations du projet à mettre à jour
 * @returns {string} 200 - Projet mis à jour avec succès
 * @returns {Error} 400 - ID projet non valide
 * @returns {Error} 404 - Projet non trouvé
 * @returns {Error} 500 - Problème de connexion à la base de données ou autre erreur serveur
 */
router.put("/update/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const update = req.body;
        const projet = await Projet.findOneAndUpdate(query, update);
        if (!projet) {
            return res.status(404).send({ message: "Projet non trouvé" });
        }
        return res.status(200).send("Projet mis à jour avec succès");
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID projet non valide" });
        } else if (error.name === "MongoNetworkError") {
            return res.status(500).send({ message: "Problème de connexion à la base de données" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la mise à jour du projet",
            });
        }
    }
});

/**
 * Supprime un projet
 * @route DELETE /Api/v1/projets/delete/{id}
 * @group Projets - Opérations sur les projets
 * @param {string} id.path.required - L'ID du projet à supprimer
 * @returns {string} 200 - Projet supprimé avec succès
 * @returns {Error} 400 - ID projet non valide
 * @returns {Error} 404 - Projet non trouvé
 * @returns {Error} 500 - Problème de connexion à la base de données ou autre erreur serveur
 */
router.delete("/delete/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const projet = await Projet.findOneAndDelete(query);
        if (!projet) {
            return res.status(404).send({ message: "Projet non trouvé" });
        }
        return res.status(200).send("Projet supprimé avec succès");
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID projet non valide" });
        } else if (error.name === "MongoNetworkError") {
            return res.status(500).send({ message: "Problème de connexion à la base de données" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la suppression du projet",
            });
        }
    }
});

module.exports = router;
