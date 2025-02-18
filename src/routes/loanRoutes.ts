import express from 'express';
import * as loanController from '../controllers';
import { User } from '../models';
import { authMiddleware, authorization } from '../middlewares';

const loanRoute = express.Router();

loanRoute.get(
    '/loans',
    authMiddleware(),
    authorization(User, ['staff', 'super_admin', 'admin']),
    loanController.getLoans,
);

loanRoute.get(
    '/:userEmail/loans',
    authMiddleware(),
    authorization(User, ['staff', 'super_admin', 'admin']),
    loanController.getUserLoans,
);

loanRoute.get(
    '/loans/status',
    authMiddleware(),
    authorization(User, ['staff', 'super_admin', 'admin']),
    loanController.getLoansStatus,
);

loanRoute.get(
    '/loans/expired',
    authMiddleware(),
    authorization(User, ['staff', 'super_admin', 'admin']),
    loanController.getExpiredLoans,
);

loanRoute.delete(
    '/:loanId/delete',
    authMiddleware(),
    authorization(User, ['super_admin']),
    loanController.deleteLoan,
);

export default loanRoute;
