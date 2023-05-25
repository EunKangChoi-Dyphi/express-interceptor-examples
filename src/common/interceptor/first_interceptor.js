export const firstInterceptor = async (req, res, next) => {
  console.log('first-inteceptor called ::: pre-intercept');
  next();
};
