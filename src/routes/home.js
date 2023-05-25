import { Router } from 'express';
var homeRouter = Router();

/* GET home page. */
homeRouter.get('/', function (req, res, next) {
  console.log("::: I'm in home page ::::");
  res.render('index', { title: 'Express' });
});

export default homeRouter;
