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
}