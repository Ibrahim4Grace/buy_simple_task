import { Schema, model } from 'mongoose';
import { ILoan, IApplicant } from '../types';

const ApplicantSchema: Schema = new Schema<IApplicant>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    totalLoan: { type: String, required: true },
});

const LoanSchema: Schema = new Schema<ILoan>({
    amount: { type: String, required: true },
    maturityDate: { type: String, required: true },
    status: { type: String, enum: ['active', 'pending'], required: true },
    applicant: { type: ApplicantSchema, required: true },
    createdAt: { type: String, required: true },
});

export const Loan = model<ILoan>('Loan', LoanSchema);
