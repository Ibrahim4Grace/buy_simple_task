import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';
import { allUserDocs, allLoanDocs } from '../docs/index';

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'buysimple Express API with Swagger',
            version: version,
            description: 'OpenAPI documentation for the buysimple project',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/`,
                description: 'Local server',
            },
            {
                url: 'https://buysimple.com/',
                description: 'Live server',
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        paths: {
            ...allUserDocs.paths,
            ...allLoanDocs.paths,
        },
    },
    apis: ['./src/controllers/**/*.ts'],
};

export const specs = swaggerJsdoc(swaggerOptions);
