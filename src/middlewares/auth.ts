import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { TokenService } from '../utils';
import {
    asyncHandler,
    ResourceNotFound,
    ServerError,
    Unauthorized,
    Forbidden,
} from '../middlewares/index';

export const extractToken = (req: Request): string | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
};

export const authMiddleware = () => {
    return asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token = extractToken(req);
                if (!token) {
                    throw new Unauthorized('No token provided');
                }

                const payload = await TokenService.verifyAuthToken(token);

                const user = await User.findById(payload.userId);
                if (!user) {
                    throw new Unauthorized('User not found');
                }

                req.user = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                };

                next();
            } catch (error) {
                if (error instanceof Unauthorized) {
                    return res.status(401).json({
                        status_code: '401',
                        success: false,
                        message: error.message,
                    });
                }
                throw new ServerError('INTERNAL_SERVER_ERROR');
            }
        },
    );
};

export const authorization = (model: any, roles: string[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id;
        if (!userId) {
            throw new Unauthorized('User not authenticated');
        }

        const currentUser = await model.findById(userId);

        if (!currentUser) {
            throw new ResourceNotFound('User not found');
        }

        req.currentUser = currentUser;

        if (!roles.includes(currentUser.role)) {
            throw new Forbidden(
                `Access denied ${currentUser.role} isn't allowed`,
            );
        }

        next();
    });
