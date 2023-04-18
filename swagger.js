const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Piquante API',
        version: '1.0.0',
        description: 'Une API pour une application d\'avis gastronomiques sur des sauces piquantes'
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ]
    },
    apis: ['./routes/*.js', './models/*.js']
  }

const swaggerSpec = swaggerJsdoc(options)

module.exports = {
  swaggerUi,
  swaggerSpec
}