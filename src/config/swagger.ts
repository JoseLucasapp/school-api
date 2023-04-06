import paths from './swagger/swaggerPaths'
import components from './swagger/swaggerComponents'

export default {
    openapi: '3.0.0',
    info: {
        title: 'School api',
        description: 'Api to manage schools',
        termsOfService: 'http://localhost:3000/terms',
        contact: {
            email: 'jlgf.profissional@gmail.com',
        },
        version: '1.0.0',
    },
    servers: [
        {
            url: '/api',
            description: 'Development',
        },
    ],
    paths: paths,
    components: {
        ...components, securitySchemes: {
            BearerAuth: {
                type: 'http',
                in: 'header',
                name: 'Authorization',
                description: 'Bearer Token',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    }
}