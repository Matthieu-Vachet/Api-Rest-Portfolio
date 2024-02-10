const express = require("express");
const router = express.Router();
const User = require("../models/createUser");

/**
 * @typedef User
 * @property {string} name.required - Le nom de l'utilisateur
 * @property {string} lastname.required - Le nom de famille de l'utilisateur
 * @property {string} profession.required - La profession de l'utilisateur
 * @property {integer} age.required - L'âge de l'utilisateur
 * @property {string} adress.required - L'adresse de l'utilisateur
 * @property {integer} cp.required - Le code postal de l'utilisateur
 * @property {string} city.required - La ville de l'utilisateur
 * @property {string} pays.required - Le pays de l'utilisateur
 * @property {string} number.required - Le numéro de téléphone de l'utilisateur
 * @property {string} email.required - L'email de l'utilisateur
 * @property {string} password.required - Le mot de passe de l'utilisateur
 */

/**
 * Récupère tous les utilisateurs
 * @route GET /Api/v1/users/
 * @group Utilisateurs - Opérations sur l'utilisateur
 * @returns {Array.<object>} 200 - Un tableau d'utilisateurs
 * @returns {Error} 400 - ID utilisateur non valide
 * @returns {Error} 500 - Problème de connexion à la base de données ou autre erreur serveur
 */
router.get("/", async (req, res) => {
    try {
        // Utilisation de la méthode find() du modèle User pour récupérer tous les utilisateurs
        const users = await User.find();
        // Envoi des utilisateurs récupérés en tant que réponse
        return res.send(users);
    } catch (error) {
        // En cas d'erreur, envoi de l'erreur en tant que réponse
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID utilisateur non valide" });
        } else if (error.name === "MongoNetworkError") {
            return res.status(500).send({ message: "Problème de connexion à la base de données" });
        } else {
            return res.status(500).send({
                message: "Erreur serveur lors de la récupération des utilisateurs",
            });
        }
    }
});

/**
 * Crée un nouvel utilisateur
 * @route POST /Api/v1/users/create
 * @group Utilisateurs - Opérations sur l'utilisateur
 * @param {User.model} user.body.required - Les informations de l'utilisateur à créer
 * @returns {string} 201 - Nouvel utilisateur créé avec succès
 * @returns {Error} 400 - Erreurs de validation
 * @returns {Error} 500 - Erreur serveur lors de la création de l'utilisateur
 */
router.post("/create", async (req, res) => {
    try {
        // Création d'une nouvelle instance du modèle User avec les données de la requête
        const user = new User(req.body);
        // Sauvegarde de l'instance dans la base de données
        await user.save();
        // Envoi d'une réponse indiquant que l'utilisateur a été créé avec succès
        return res.status(201).send("Nouvel utilisateur créé avec succès");
    } catch (error) {
        // En cas d'erreur, log de l'erreur et envoi de l'erreur en tant que réponse
        console.log(error);
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send({ errors });
        }
        return res
            .status(500)
            .send({ message: "Erreur serveur lors de la création de l'utilisateur" });
    }
});

/**
 * Met à jour un utilisateur
 * @route PUT /Api/v1/users/update/{id}
 * @group Utilisateurs - Opérations sur l'utilisateur
 * @param {string} id.path.required - ID de l'utilisateur
 * @param {User.model} user.body.required - Les informations de l'utilisateur à mettre à jour
 * @returns {string} 200 - Utilisateur mis à jour avec succès
 * @returns {Error} 400 - ID utilisateur non valide ou erreurs de validation
 * @returns {Error} 404 - Utilisateur non trouvé
 * @returns {Error} 500 - Erreur serveur lors de la mise à jour de l'utilisateur
 */
router.put("/update/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const update = req.body;
        const user = await User.findOneAndUpdate(query, update);
        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé" });
        }
        return res.send("Utilisateur mis à jour avec succès");
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID utilisateur non valide" });
        } else if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send({ errors });
        }
        return res
            .status(500)
            .send({ message: "Erreur serveur lors de la mise à jour de l'utilisateur" });
    }
});

/**
 * Supprime un utilisateur
 * @route DELETE /Api/v1/users/delete/{id}
 * @group Utilisateurs - Opérations sur l'utilisateur
 * @param {string} id.path.required - ID de l'utilisateur
 * @returns {string} 200 - Utilisateur supprimé avec succès
 * @returns {Error} 400 - ID utilisateur non valide
 * @returns {Error} 404 - Utilisateur non trouvé
 * @returns {Error} 500 - Erreur serveur lors de la suppression de l'utilisateur
 */

router.delete("/delete/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const user = await User.findOneAndDelete(query);
        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé" });
        }
        return res.send("Utilisateur supprimé avec succès");
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(400).send({ message: "ID utilisateur non valide" });
        }
        return res
            .status(500)
            .send({ message: "Erreur serveur lors de la suppression de l'utilisateur" });
    }
});

module.exports = router;
