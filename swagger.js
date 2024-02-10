const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Spanish Speaking Countries',
    description: 'Collection of Spanish Speaking Country Info'
  },
  host: 'ws5-spanishspeakingapi.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });