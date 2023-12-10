import swaggerJSDoc from "swagger-jsdoc";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Quizy Pulse",
    version: "1.0.0",
    description:
      "Explore our API, a powerful platform designed for seamless interaction with diverse features. Unlock secure user authentication, manage dynamic quizzes, and access rich user data effortlessly.",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
