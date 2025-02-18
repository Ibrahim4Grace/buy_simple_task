export enum UserRole {
    STAFF = 'staff',
    ADMIN = 'admin',
    SUPERADMIN = 'super_admin',
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}

export interface IApplicant {
    name: string;
    email: string;
    telephone: string;
    totalLoan: string;
}

export interface ILoan {
    id: string;
    amount: string;
    maturityDate: string;
    status: 'active' | 'pending';
    applicant: IApplicant;
    createdAt: string;
}

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    name: string;
}
export interface RequestWithUser extends Request {
    user?: IUser;
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
            currentUser?: IUser;
        }
    }
}

export interface AuthJwtPayload {
    userId: string;
    role: UserRole;
}
