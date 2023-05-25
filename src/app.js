import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from './routes/router';
import { secondInterceptor } from './common/interceptor/second_interceptor';

var app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// 전체 인터셉터 적용
// router 정의
app.use('/api', router, secondInterceptor);

// 에러 핸들링 & 페이지 존재하지 않을때
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 전체 에러핸들링.
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  return res.status(err.status || 500).send();
  // res.render('error');
});

// 서버 실행
const port = 3001;
app.listen(port, () => {
  console.log(`GETTING STARTED PROJECT AT : ${port}`);
});

//
