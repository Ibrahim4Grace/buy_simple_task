export const loanDocs = {
    paths: {
        '/api/v1/users/loans': {
            get: {
                summary: 'Get all loans',
                tags: ['Loans'],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Successfully retrieved loans',
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
                                            example:
                                                'Loans retrieved successfully',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                data: {
                                                    type: 'array',
                                                    items: {
                                                        $ref: '#/components/schemas/Loan',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    404: { description: 'Loan not found' },
                    401: { description: 'Unauthorized' },
                    500: { description: 'Server error' },
                },
            },
        },
        '/api/v1/users/{userEmail}/loans': {
            get: {
                summary: 'Get loans for a specific user',
                tags: ['Loans'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'userEmail',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Email of the user to retrieve loans for',
                        example: 'john.doe@example.com',
                    },
                ],
                responses: {
                    200: {
                        description: 'Successfully retrieved user loans',
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
                                            example:
                                                'Loans retrieved successfully',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                loans: {
                                                    type: 'array',
                                                    items: {
                                                        $ref: '#/components/schemas/Loan',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: { description: 'Unauthorized' },
                    500: { description: 'Server error' },
                },
            },
        },
        '/api/v1/users/loans/status': {
            get: {
                summary: 'Get loans filtered by status',
                tags: ['Loans'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'status',
                        in: 'query',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['pending', 'active'],
                        },
                        description: 'Filter loans by status',
                        example: 'pending',
                    },
                ],
                responses: {
                    200: {
                        description: 'Successfully retrieved filtered loans',
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
                                            example:
                                                'Loans retrieved successfully',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                data: {
                                                    type: 'array',
                                                    items: {
                                                        $ref: '#/components/schemas/Loan',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: { description: 'Unauthorized' },
                    500: { description: 'Server error' },
                },
            },
        },
        '/api/v1/users/loans/expired': {
            get: {
                summary: 'Get expired loans (maturity date in the past)',
                tags: ['Loans'],
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Successfully retrieved expired loans',
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
                                            example:
                                                'Expired loans retrieved successfully',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                loans: {
                                                    type: 'array',
                                                    items: {
                                                        $ref: '#/components/schemas/Loan',
                                                    },
                                                },
                                                count: {
                                                    type: 'number',
                                                    example: 5,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: { description: 'Unauthorized' },
                    500: { description: 'Server error' },
                },
            },
        },
        '/api/v1/user/{loanId}/delete': {
            delete: {
                summary: 'Delete a loan (Super Admin only)',
                tags: ['Loans'],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'loanId',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID of the loan to delete',
                        example: '60d21b4667d0d8992e610c85',
                    },
                ],
                responses: {
                    200: {
                        description: 'Successfully deleted loan',
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
                                            example:
                                                'Loan with id 60d21b4667d0d8992e610c85 deleted successfully',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    404: { description: 'Loan not found' },
                    401: { description: 'Unauthorized' },
                    403: {
                        description: 'Forbidden - Requires Super Admin role',
                    },
                    500: { description: 'Server error' },
                },
            },
        },
    },
    components: {
        schemas: {
            Loan: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '60d21b4667d0d8992e610c85' },
                    amount: { type: 'string', example: '5000.00' },
                    maturityDate: {
                        type: 'string',
                        format: 'date-time',
                        example: '2023-12-31T00:00:00.000Z',
                    },
                    status: {
                        type: 'string',
                        enum: ['active', 'pending'],
                        example: 'active',
                    },
                    applicant: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', example: 'John Doe' },
                            email: {
                                type: 'string',
                                example: 'john.doe@example.com',
                            },
                            telephone: {
                                type: 'string',
                                example: '+1234567890',
                            },
                            totalLoan: { type: 'string', example: '10000.00' },
                        },
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2023-06-15T14:30:00.000Z',
                    },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
};

export const allLoanDocs = {
    paths: {
        ...loanDocs.paths,
    },
};
