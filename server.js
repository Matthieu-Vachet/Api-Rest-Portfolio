const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 1048;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projetRoutes = require("./routes/projetsRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const cors = require("cors");
let expressSwagger = require("express-swagger-generator")(app);

app.use(cors());
app.use(bodyParser.json());

// Ajout des en-têtes CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    next();
});

// Message acceuil
app.get("/", (req, res) => {
    res.send("Welcome to my Portfolio API");
});

// Connect to database
connectDB();

// Swagger configuration
// http://node6.adky.net:1048/api-docs
let options = {
    swaggerDefinition: {
        info: {
            description: "Documentation API",
            title: "Api personnelle pour mon Portfolio",
            version: "1.0.0",
        },
        // host: "localhost:" + PORT,
        host: "node6.adky.net:1048",
        basePath: "v1",
        produces: ["application/json", "application/xml"],
        schemes: ["http", "https"],
    },
    basedir: __dirname,
    files: ["./routes/*.js"],
};
expressSwagger(options);

// Use routes
app.use("/Api/v1/auth", authRoutes);
app.use("/Api/v1/users", userRoutes);
app.use("/Api/v1/projets", projetRoutes);
app.use("/Api/v1/experiences", experienceRoutes);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
