export const secondInterceptor = async (req, res, next) => {
  console.log('second-interceptor ::: post_handler()');
  return res.status(200).send('ok');
};
