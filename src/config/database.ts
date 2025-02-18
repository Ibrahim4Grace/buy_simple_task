import mongoose from 'mongoose';
import { log } from '../utils';
import { seedUsers, seedLoans } from '../controllers';

export const initializeDatabase = async (): Promise<void> => {
    const { MONGODB_URI } = process.env;

    if (!MONGODB_URI) {
        throw new Error('MongoDB URI is missing!');
    }

    try {
        await mongoose.connect(MONGODB_URI);
        log.info('Database connected successfully');
        if (process.env.NODE_ENV === 'development') {
            await Promise.all([seedUsers(), seedLoans()]);
        }
    } catch (err) {
        log.error('Database connection failed:', err);
    }
};
