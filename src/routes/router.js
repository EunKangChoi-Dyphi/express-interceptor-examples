import * as express from 'express';
import homeRouter from './home';
import userRouter from './users';

const router = express.Router();
router.use('/', homeRouter);
router.use('/users', userRouter);

export default router;
