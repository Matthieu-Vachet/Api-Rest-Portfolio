const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    // Récupérer le token d'authorization de l'en-tête HTTP
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Si le token est null, renvoyer une erreur 401 Unauthorized
    if (!token) return res.sendStatus(401);

    // Vérifier le token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            // Si le token est invalide, renvoyer une erreur 403 Forbidden
            return res.sendStatus(403);
        }
        // Si le token est valide, ajouter les informations de l'utilisateur à l'objet req
        req.user = user;
        // Passer à l'étape suivante du middleware
        next();
    });
}

module.exports = authenticateToken;
