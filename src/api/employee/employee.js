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

router.post('/employee_list', async (req, res) => {
  try {
    var where = '';
    if(parseInt(req.user.role,10) !== 0){
      var branches = req.user.id_branch.split(",");
      if(branches.length>0){
        where = 'WHERE F_BRANCH_ID IN ("'+branches.join('","')+'")';
      }else{
        where = 'WHERE F_BRANCH_ID IN ("'+branches.join()+'")';
      }
    }
    const data = await db.query('SELECT `id`,`F_ID`,`F_NAME`,`F_PATRONIMIC`,`F_SURNAME`,`F_WORK_NAME`,`startTime`,`F_BRANCH_ID`,`F_DESCR` FROM employee_list '+where+'');
    if(data.length>0){
      return res.status(200).send({ type: "ok", data: data });
    }else{
      return res.status(200).send({ type: "error", msg: 'Employee list empty'});
    }
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});
router.post('/employee_group_add', async (req, res) => {
  if(!req.body.name){
    return res
      .status(200)
      .send({ type: "error", msg: 'Не получен название группы' });
  }
  try {
    const data = await db.query('INSERT INTO employee_group (name,parent_id) values ("'+req.body.name+'",0)');
    return res.status(200).send({ type: "ok", msg: 'Группа удачно добавлен'});
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});
router.post('/employee_group_list', async (req, res) => {
  try {
    const data = await db.query('SELECT `id`,`name`,`parent_id` FROM employee_group');
    if(data.length>0){
      return res.status(200).send({ type: "ok", data: data });
    }else{
      return res.status(200).send({ type: "error", msg: 'Employee group empty'});
    }
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});
export default router;
