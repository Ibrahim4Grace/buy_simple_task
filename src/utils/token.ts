import jwt from 'jsonwebtoken';
import { Unauthorized } from '../middlewares/index';
import { config } from '../config/index';
import { UserRole, AuthJwtPayload } from '../types/index';

export class TokenService {

    static createAuthToken(payload: {
        userId: string;
        role: UserRole;
    }): string {
        if (!config.JWT_AUTH_SECRET) {
            throw new Error('JWT_AUTH_SECRET is not defined');
        }

        return jwt.sign(payload, config.JWT_AUTH_SECRET, {
            expiresIn: '1d',
        });
    }

    static verifyAuthToken(token: string): Promise<AuthJwtPayload> {
        return new Promise((resolve, reject) => {
            if (!config.JWT_AUTH_SECRET) {
                return reject(new Error('JWT_AUTH_SECRET is not defined'));
            }

            jwt.verify(token, config.JWT_AUTH_SECRET, (err, decoded) => {
                if (err || !decoded) {
                    return reject(
                        new Unauthorized('Invalid authentication token'),
                    );
                }
                resolve(decoded as AuthJwtPayload);
            });
        });
    }
}
