import { Request, Response } from 'express';
import { User } from '../models/User';
import { IUser, UserRole } from '../types';
import { TokenService, log } from '../utils';
import { Unauthorized, sendJsonResponse, asyncHandler } from '../middlewares';

const staffData: IUser[] = [
    {
        id: 1,
        name: 'Edwin John',
        email: 'edwinjohn@example.com',
        role: UserRole.SUPERADMIN,
        password: '12345Pass',
        comparePassword: async function (password: string) {
            return password === this.password;
        },
    },
    {
        id: 2,
        name: 'Jackson Page',
        email: 'jp@example.com',
        role: UserRole.ADMIN,
        password: '1234567Pass',
        comparePassword: async function (password: string) {
            return password === this.password;
        },
    },
    {
        id: 3,
        name: 'Larry Adam',
        email: 'ladam@example.com',
        role: UserRole.STAFF,
        password: '123456789Pass',
        comparePassword: async function (password: string) {
            return password === this.password;
        },
    },
];

export const seedUsers = async (): Promise<void> => {
    try {
        for (const staff of staffData) {
            const existingUser = await User.findOne({ email: staff.email });
            if (!existingUser) {
                await User.create(staff);
            }
        }
        log.info('Users seeded successfully');
    } catch (error) {
        log.error('Error seeding users:', error);
    }
};

export const login = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Unauthorized('Invalid email or password');
        }

        const isValid = await user.comparePassword(password);
        if (!isValid) {
            throw new Unauthorized('Invalid email or password');
        }

        const token = TokenService.createAuthToken({
            userId: user._id.toString(),
            role: user.role,
        });

        sendJsonResponse(
            res,
            200,
            'Login successful',
            {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            token,
        );
    },
);
