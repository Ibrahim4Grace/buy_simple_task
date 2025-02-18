export const authUserDocs = {
    paths: {
        '/api/v1/auth/users/login': {
            post: {
                summary: 'Login with email and password',
                tags: ['Authenticate - User'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                        example: 'john.doe@example.com',
                                    },
                                    password: {
                                        type: 'string',
                                        example: 'strongpassword123',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login successful.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: {
                                            type: 'number',
                                            example: 200,
                                        },
                                        message: {
                                            type: 'string',
                                            example: 'Login successful.',
                                        },
                                        user: {
                                            type: 'object',
                                            properties: {
                                                name: {
                                                    type: 'string',
                                                    example: 'John Doe',
                                                },
                                                email: {
                                                    type: 'string',
                                                    example:
                                                        'john.doe@example.com',
                                                },
                                            },
                                        },
                                        token: {
                                            type: 'string',
                                            example: 'jwt-auth-token',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: { description: 'Invalid email or password' },
                    403: { description: 'Email not verified' },
                    500: { description: 'Server error' },
                },
            },
        },
    },
};

export const allUserDocs = {
    paths: {
        ...authUserDocs.paths,
    },
};
