import { Router } from 'express';
import db from '../../db';
import jwt from 'express-jwt';
const bcrypt = require('bcryptjs');
const util = require('util');
const router = Router();

router.use(function authCheck(req, res, next) {
  if (!req.user.login){
    return res.sendStatus(401);
  }
  next();
});
router.post('/services_list', async (req, res) => {
  try {
    const data = await db.query('SELECT `id`,`F_ID`,`F_NAME`,`F_WORK_NAME`,`F_ID_PARENT`,`F_F_2`,`F_QWAIT_TIME`,`F_MAX_SERV_TIME` FROM services_list');
    if(data.length>0){
      return res.status(200).send({ type: "ok", data: data });
    }else{
      return res.status(200).send({ type: "error", message: 'Empty services'});
    }
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});
router.post('/role-list', async (req, res) => {
  try {
    const data = await db.query('SELECT `id`,`F_ID`,`F_NAME`,`F_QUEUE_ID` FROM role');
    if(data.length>0){
      return res.status(200).send({ type: "ok", data: data });
    }else{
      return res.status(200).send({ type: "error", message: 'Empty role'});
    }
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});
export default router;
