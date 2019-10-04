import { Router } from 'express';
import db from '../../db';
import jwt from 'express-jwt';
const bcrypt = require('bcryptjs');
const util = require('util');
const router = Router();

router.use(function authCheck(req, res, next) {
  if (!req.user.login){
    return res.sendStatus(200).send({type: 'error',msg: 'Вы не авторизованы'});
  }
  next();
});
router.post('/usercheck', async (req, res) => {
    try {
      const data = await db.query('SELECT id,login,password,role,id_branch FROM users WHERE id="'+req.user.user_id+'"');
      if(data.length>0){
        return res.status(200).send({ type: "ok", user_app: data });
      }else{
        return res.status(200).send({ type: "error", msg: 'Пользователь не найден' });
      }
    } catch (err) {
      return res
        .status(401)
        .send({ type: "error", msg: err.message });
    }
});
export default router;
