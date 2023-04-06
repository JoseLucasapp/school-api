export default {
    '/login': {
        post: {
            summary: 'Route to login',
            description: 'Route to get the auth token.',
            tags: ['Auth'],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Login',
                        },
                        examples: {
                            admin: {
                                value: {
                                    email: 'admin@admin.com',
                                    password: 'admin123',
                                    type: 'ADMIN'
                                },
                            },
                            school: {
                                value: {
                                    email: 'school@school.com',
                                    password: 'school123',
                                    type: 'SCHOOL'
                                },
                            },
                            teacher: {
                                value: {
                                    email: 'teacher@teacher.com',
                                    password: 'teacher123',
                                    type: 'TEACHER'
                                },
                            },
                            student: {
                                value: {
                                    email: 'student@student.com',
                                    password: 'student123',
                                    type: 'STUDENT'
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '500': {
                    description: 'Server error.',
                },
                '400': {
                    description: 'Incorrect password',
                },
                '404': {
                    description: 'User not found',
                },
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                $ref: '#/components/schemas/Login',
                            },
                        },
                    },
                },
            },
        },
    },
    '/school': {
        post: {
            summary: 'Route to create school',
            description: 'Route to create a new school.',
            tags: ['School'],
            security: [{
                BearerAuth: []
            }],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/School',
                        },
                        examples: {
                            school: {
                                value: {
                                    email: 'school@school.com',
                                    password: 'school123',
                                    phone: 99999999999,
                                    name: 'school'
                                },
                            }
                        },
                    },
                },
            },
            responses: {
                '500': {
                    description: 'Server error.',
                },
                '401': {
                    description: 'Not informed token',
                },
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                $ref: '#/components/schemas/School',
                            },
                        },
                    },
                },
            },
        },
    }
}