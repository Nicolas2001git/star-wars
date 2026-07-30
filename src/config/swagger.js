import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Star Wars Mocking API",
      version: "1.0.0",
      description:
        "API documentation for galactic users, creatures and adoption missions."
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local development server"
      }
    ],
    tags: [
      {
        name: "Users",
        description: "Galactic citizen endpoints"
      }
    ]
  },

  apis: ["./src/docs/*.yaml"]
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;