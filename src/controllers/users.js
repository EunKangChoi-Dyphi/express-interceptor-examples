export const userCheck = async (req, res, next) => {
  try {
    console.log('/users/check');
    console.log('::::check::::');
    // return res.status(200).send('check');
    next();
  } catch (e) {
    next(e);
  }
};
