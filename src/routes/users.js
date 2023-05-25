import { Router } from 'express';
import { userCheck } from '../controllers/users';
import { firstInterceptor } from '../common/interceptor/first_interceptor';
import { secondInterceptor } from '../common/interceptor/second_interceptor';

const userRouter = Router();

// 일부 API에서 인터셉터 적용
userRouter.get('/check', firstInterceptor, userCheck, secondInterceptor);

userRouter.get('/', function (req, res, next) {
  console.log('::::: /users/::::');
  next();
  // return res.status(200).send('user home');
});

export default userRouter;
