const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const usersRoutes = require("./routes/usersRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const openapiDocument = YAML.load(path.join(process.cwd(), "docs", "openapi.yaml"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/css", express.static(path.join(process.cwd(), "public", "css")));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", usersRoutes);
app.use(viewRoutes);


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server running",
    uptime: process.uptime(), // Tiempo que el servidor lleva levantado
    timeStamp: new Date().toISOString() // ISO lectura de máquinas 2026-04-22 UTM
  })
})


app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
