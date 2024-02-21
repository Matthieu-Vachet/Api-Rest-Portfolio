const express = require("express");
const router = express.Router(); // Ajoutez cette ligne pour définir le routeur

const jwt = require("jsonwebtoken");
const User = require("../models/createUser"); // Assurez-vous de remplacer '../models/User' par le chemin correct vers votre modèle d'utilisateur

/**
 * @typedef Credentials
 * @property {string} email.required - L'adresse email de l'utilisateur
 * @property {string} password.required - Le mot de passe de l'utilisateur
 */

// Endpoint pour l'authentification des utilisateurs
/**
 * @route POST /Api/v1/auth/login
 * @group Authentification - Opérations d'authentification
 * @param {Credentials.model} credentials.body.required - Les identifiants de l'utilisateur
 * @returns {object} 200 - Un objet contenant le token JWT
 * @returns {Error} 401 - Adresse email ou mot de passe incorrect
 * @returns {Error} 500 - Erreur serveur lors de l'authentification
 */
// Endpoint pour l'authentification des utilisateurs
router.post("/login", async (req, res) => {
    // Récupérer les identifiants fournis par l'utilisateur
    const { email, password } = req.body;

    try {
        // Recherchez l'utilisateur dans la base de données en fonction de l'adresse email
        const user = await User.findOne({ email });

        // Si l'utilisateur est trouvé et que le mot de passe correspond
        if (user && user.password === password) {
            // Générez un jeton JWT avec l'ID de l'utilisateur
            const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

            // Envoyez le jeton JWT en tant que réponse à la connexion réussie
            res.json({ token });
        } else {
            // Si l'utilisateur n'est pas trouvé ou si le mot de passe ne correspond pas
            res.status(401).json({ message: "Adresse email ou mot de passe incorrect" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur lors de l'authentification" });
    }
});

module.exports = router; // N'oubliez pas d'exporter le routeur
