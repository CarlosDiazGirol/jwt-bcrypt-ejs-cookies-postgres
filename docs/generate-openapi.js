const postmanToOpenApi = require("postman-to-openapi");

async function generateOpenApi() {
  try {
    await postmanToOpenApi("./docs/postman.json", "./docs/openapi.yaml", {
      defaultTag: "General",
      servers: [
        {
          url: "/", // Si comienzan vurstras TODAS vuestras rutas desde API poned /api
          description: "API same origin",
        },
      ],
    });

    console.log("OpenAPI generado en ./docs/openapi.yaml");
  } catch (error) {
    console.error("Error generando OpenAPI:", error.message || error);
    process.exit(1);
  }
}

generateOpenApi();