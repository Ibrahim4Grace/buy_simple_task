import { Schema, model } from 'mongoose';
import { IUser, UserRole } from '../types';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole),
        default: UserRole.STAFF,
    },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (
    password: string,
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export const User = model<IUser>('User', UserSchema);
