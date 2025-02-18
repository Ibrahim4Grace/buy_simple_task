import { Response, NextFunction, Request } from 'express';
import { ILoan, UserRole } from '../types';
import { Loan } from '../models';
import { log } from '../utils';
import {
    sendJsonResponse,
    ResourceNotFound,
    asyncHandler,
} from '../middlewares';

const loansData: ILoan[] = [
    {
        id: '900199',
        amount: '₦5,587,858',
        maturityDate: '2024-03-25 14:27:37',
        status: 'active',
        applicant: {
            name: 'Alexander Janet',
            email: 'alexanderjanet@tester.com',
            telephone: '+14958403848',
            totalLoan: '₦14,234,433,454',
        },
        createdAt: '2024-01-25 14:27:37',
    },
    {
        id: '740510',
        amount: '₦3,987,654',
        maturityDate: '2024-01-10 16:30:45',
        status: 'active',
        applicant: {
            name: 'Michael Brown',
            email: 'michaelbrown@example.com',
            telephone: '+1987654321',
            totalLoan: '₦235,234,467,234',
        },
        createdAt: '2023-02-10 16:30:45',
    },
    {
        id: '810209',
        amount: '₦7,123,456',
        maturityDate: '2024-04-15 09:45:21',
        status: 'pending',
        applicant: {
            name: 'Emily Johnson',
            email: 'emilyjohnson@example.com',
            telephone: '+1234567890',
            totalLoan: '₦589,394,698,039',
        },
        createdAt: '2024-02-15 09:45:21',
    },
    {
        id: '620703',
        amount: '₦9,876,543',
        maturityDate: '2024-06-20 11:20:15',
        status: 'pending',
        applicant: {
            name: 'Michael Brown',
            email: 'michaelbrown@example.com',
            telephone: '+1987654321',
            totalLoan: '₦235,234,467,234',
        },
        createdAt: '2024-02-20 11:20:15',
    },
    {
        id: '570820',
        amount: '₦6,543,210',
        maturityDate: '2024-07-05 14:50:30',
        status: 'active',
        applicant: {
            name: 'Daniel Miller',
            email: 'danielmiller@example.com',
            telephone: '+1444444444',
            totalLoan: '₦95,535,554',
        },
        createdAt: '2024-02-05 14:50:30',
    },
    {
        id: '480927',
        amount: '₦8,765,432',
        maturityDate: '2024-02-12 10:10:10',
        status: 'active',
        applicant: {
            name: 'Olivia Wilson',
            email: 'oliviawilson@example.com',
            telephone: '+1666666666',
            totalLoan: '₦575,598,034,586,394,345',
        },
        createdAt: '2024-01-12 10:10:10',
    },
    {
        id: '310498',
        amount: '₦4,567,890',
        maturityDate: '2024-09-30 15:45:00',
        status: 'active',
        applicant: {
            name: 'Sophie Adams',
            email: 'sophieadams@example.com',
            telephone: '+17778889999',
            totalLoan: '₦223,455,434,356',
        },
        createdAt: '2024-01-30 15:45:00',
    },
    {
        id: '680237',
        amount: '₦2,345,678',
        maturityDate: '2024-10-15 12:30:00',
        status: 'pending',
        applicant: {
            name: 'James Anderson',
            email: 'jamesanderson@example.com',
            telephone: '+15556667777',
            totalLoan: '₦90,456,345,345',
        },
        createdAt: '2024-02-15 12:30:00',
    },
    {
        id: '780598',
        amount: '₦1,234,567',
        maturityDate: '2024-11-25 09:15:00',
        status: 'active',
        applicant: {
            name: 'James Anderson',
            email: 'jamesanderson@example.com',
            telephone: '+15556667777',
            totalLoan: '₦134,234,567',
        },
        createdAt: '2024-01-25 09:15:00',
    },
    {
        id: '960374',
        amount: '₦9,012,345',
        maturityDate: '2024-12-10 14:00:00',
        status: 'pending',
        applicant: {
            name: 'William Davis',
            email: 'williamdavis@example.com',
            telephone: '+18889990000',
            totalLoan: '₦235,234,467,234',
        },
        createdAt: '2024-02-10 14:00:00',
    },
    {
        id: '570321',
        amount: '₦3,210,987',
        maturityDate: '2025-01-20 11:00:00',
        status: 'active',
        applicant: {
            name: 'Ella Thompson',
            email: 'ellathompson@example.com',
            telephone: '+16665557777',
            totalLoan: '₦235,234,467,234',
        },
        createdAt: '2024-01-20 11:00:00',
    },
];

export const seedLoans = async (): Promise<void> => {
    for (const loan of loansData) {
        const existingLoan = await Loan.findOne({ id: loan.id });
        if (!existingLoan) {
            await Loan.create(loan);
        }
    }
    log.info('Loans seeded successfully');
};

export const getLoans = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const userRole = req.currentUser.role;
        const responseData = await Loan.find();
        if (!responseData) {
            throw new ResourceNotFound(`Loan not found`);
        }

        const filteredData = responseData.map((loan) => {
            const loanData = loan.toObject({ versionKey: false });
            if (userRole !== 'admin' && userRole !== 'super_admin') {
                delete loanData.applicant.totalLoan;
            }
            return loanData;
        });

        sendJsonResponse(res, 200, 'Login successful', { data: filteredData });
    },
);

export const getUserLoans = asyncHandler(
    async (req: Request, res: Response) => {
        const userRole = req.currentUser.role;
        const { userEmail } = req.params;

        const loans = await Loan.find({ 'applicant.email': userEmail }).lean({
            versionKey: false,
        });

        if (!loans.length) {
            return res.status(200).json({
                success: true,
                data: { loans: [] },
            });
        }

        const filteredLoans = loans.map((loan) => {
            if (userRole !== 'admin' && userRole !== 'super_admin') {
                delete loan.applicant.totalLoan;
            }
            return loan;
        });

        sendJsonResponse(res, 200, 'Loans retrieved successfully', {
            loans: filteredLoans,
        });
    },
);

export const getLoansStatus = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const userRole = req.currentUser.role;
        const { status } = req.query;

        const query: any = {};

        if (status && ['pending', 'active'].includes(status as string)) {
            query.status = status;
        }
        const responseData = await Loan.find(query).lean({ versionKey: false });
        if (!responseData || responseData.length === 0) {
            return sendJsonResponse(res, 200, 'No loans found', { data: [] });
        }

        const filteredData = responseData.map((loan) => {
            if (userRole !== 'admin' && userRole !== 'super_admin') {
                delete loan.applicant.totalLoan;
            }
            return loan;
        });

        sendJsonResponse(res, 200, 'Loans retrieved successfully', {
            data: filteredData,
        });
    },
);

export const getExpiredLoans = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const currentDate = new Date().toISOString();

        let loans = await Loan.find({
            maturityDate: { $lt: currentDate },
        }).lean();

        if (req.currentUser?.role === UserRole.STAFF) {
            loans = loans.map((loan) => {
                const loanObj = { ...loan };
                delete loanObj.applicant.totalLoan;
                return loanObj;
            });
        }

        sendJsonResponse(res, 200, 'Expired loans retrieved successfully', {
            loans,
            count: loans.length,
        });
    },
);

export const deleteLoan = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const userId = req.currentUser.role;
        const { loanId } = req.params;

        const loan = await Loan.findOne({ id: loanId });

        if (!loan) {
            throw new ResourceNotFound(`Loan not found with id ${loanId}`);
        }

        await Loan.deleteOne({ id: loanId });

        sendJsonResponse(
            res,
            200,
            `Loan with id ${loanId} deleted successfully`,
        );
    },
);
