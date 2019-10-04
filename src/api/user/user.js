import { Router } from 'express';
import db from '../../db';
import jwt from 'express-jwt';
const bcrypt = require('bcryptjs');
const util = require('util');
const router = Router();
var moment = require('moment');
moment.locale('kk');
router.use(function authCheck(req, res, next) {
  if (!req.user.login){
    return res.sendStatus(401);
  }else{
    if(req.user.role != 0){
      return res
        .status(401)
        .send({ status: false, message: 'У вас недостаточно прав' });
    }
    next();
  }
});

router.post('/userlist', async (req, res) => {
  try {
    const data = await db.query('SELECT id,login,password,role,id_branch, DATE_FORMAT(ins_date,"%d.%m.%Y") as ins_date,ins_by_id FROM users WHERE delete_status=0');
    if(data.length>0){
      return res.status(200).send({ type: "ok", data: data });
    }else{
      return res.status(401).send({ type: "error", msg: 'Пользователи еще не добавлены' });
    }
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }


});
router.post('/useradd',  async (req, res) => {
  if(!req.body.login){
    return res
      .status(200)
      .send({ type: "error", msg: 'Не получен логин' });
  }
  if(!req.body.password){
    return res
      .status(200)
      .send({ type: "error", msg: 'Не получен пароль' });
  }
  if(!req.body.role){
    return res
      .status(200)
      .send({ type: "error", msg: 'Не получен роль' });
  }

  if(!req.body.id_branch && req.user.role !==0){
    return res
      .status(200)
      .send({ type: "error", msg: 'Не получен отделение' });
  }
  try {
    const ins_date = moment().format('YYYY-DD-MM h:mm:ss');
    if(req.body.role === 0){
      const data = await db.query('INSERT INTO users (login,password,role,id_branch,ins_date,ins_by_id) values ("'+req.body.login+'","'+req.body.password+'",'+
                    '"'+req.body.role+'","","'+ins_date+'","'+req.user.user_id+'")');
    }else{
      const data = await db.query('INSERT INTO users (login,password,role,id_branch,ins_date,ins_by_id) values ("'+req.body.login+'","'+req.body.password+'",'+
                    '"'+req.body.role+'","'+req.body.id_branch+'","'+ins_date+'","'+req.user.user_id+'")');
    }
    return res.status(200).send({ type: "ok", msg: 'Пользователь удачно добавлен' });
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});

router.post('/userinfo', async (req, res) => {
    try {
      const data = await db.query('SELECT id,login,password,role,id_branch, DATE_FORMAT(ins_date,"%d.%m.%Y") as ins_date FROM users WHERE id="'+req.body.user_id+'"');
      if(data.length>0){
        return res.status(200).send({ type: "ok", data: data });
      }else{
        return res.status(200).send({ type: "error", msg: 'Пользователь не найден' });
      }
    } catch (err) {
      return res
        .status(401)
        .send({ status: false, message: err.message });
    }
});
router.post('/userdelete',async (req, res) => {
  try {
    const data = await db.query('UPDATE users set delete_status=1 WHERE id="'+req.body.user_id+'"');
    return res.status(200).send({ type: "ok", msg: 'Пользователь удачно удален' });
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});
export default router;
