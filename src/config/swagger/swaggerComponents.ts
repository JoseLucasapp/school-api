export default {
    schemas: {
        Admins: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                password: {
                    type: 'string',
                },
                type: {
                    type: 'string'
                }
            }
        },
        School: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                },
                phone: {
                    type: 'number'
                }
            }
        },
        Teacher: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                },
                phone: {
                    type: 'number'
                },
                subject: {
                    type: '[string]'
                },
                school_id: {
                    type: 'string'
                },
            }
        },
        Student: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                },
                phone: {
                    type: 'number'
                },
                school_id: {
                    type: 'string'
                },
            }
        },
        Login: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        }
                    }

                },
                token: {
                    type: 'string',
                }
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'bearerAuth',
                in: 'header',
            },
        },
    }
}

/*example: {
        type: 'object',
        properties: {}
    } */