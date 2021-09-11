const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


// data parser - used to parse post data with express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dogs = [{id: 0, name: 'Sacha', breed: 'Great Dane'}]

// SWAGGER

const swaggerOptions = {
    swaggerDefinition: {
        // setting a title and version
        info: {
            title: 'Library API',
            version: '1.0.0'
        }
    },
    // pointing to the path of the API
    apis: ['app.js']
}
//passing the above into swaggerDocs
const swaggerDocs = swaggerJSDoc(swaggerOptions);
// passing the configuration into express by defining a path (api-docs) - which can be called anything
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



// GET ROUTE:

// Swagger documentation

/**
* @swagger
* /dogs:
*   get:
*     description: Get all dogs
*     responses:
*       200:
*         description: Success
*
*/
app.get('/dogs', (req, res) => {
    res.send(dogs);
});

// POST ROUTE:

// Swagger documentation

/*
* @swagger
* definitions:
*   Dog:
*     required:
*       - id
*       - name
*       - breed
*     properties:
*       id:
*         type: string
*       name:
*         type: string
*       breed:
*         type: string
*       path:
*         type: string
*/


/**
* @swagger
* /dog:
*   post:
*     description: Add a dog
*     parameters:
*     - name: name
*       description: Dog Name
*       in: body
*       required: true
*     responses:
*       200:
*         description: Success
*/

app.post('/dog', (req,res) => {
    dogs.push({name:req.body.name})
    res.send(`${JSON.stringify(dogs)} created`)
})

// PORT IDENTIFICATION

app.listen(3000, () => {
    console.log('Running on port: 3000')
})