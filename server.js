const express = require("express");
const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 1048;
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
let expressSwagger = require("express-swagger-generator")(app);

app.use(express.json());

// Connect to database
connectDB();

// Swagger configuration
let options = {
    swaggerDefinition: {
        info: {
            description: "Documentation API",
            title: "Api personnelle pour mon Portfolio",
            version: "1.0.0",
        },
        // host: "localhost:" + PORT,
        host: "node6.adky.net:1048",
        basePath: "/v1",
        produces: ["application/json", "application/xml"],
        schemes: ["http", "https"],
    },
    basedir: __dirname,
    files: ["./routes/*.js"],
};
expressSwagger(options);

// Use user routes
app.use("/v1/users", userRoutes);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
