import { Router } from 'express';
import db from '../../db';
import jwt from 'express-jwt';
const bcrypt = require('bcryptjs');
const util = require('util');
const router = Router();
var _ = require('lodash');
router.use(function authCheck(req, res, next) {
  if (!req.user.login){
    return res.sendStatus(401);
  }
  next();
});

router.post('/branch_list', async (req, res) => {

  try{
    const data = await db.query('SELECT id,F_ID,F_NAME,F_IP_ADDRESS,F_PARENT_ID,ONN FROM branches');
    if(data.length>0){
      return res.status(200).send({ type: "ok", data: data });
    }else{
      return res.status(401).send({ type: "error", message: 'Нет прав для просмотра'});
    }
  }catch (err){
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }

});
router.post('/window-state', async (req, res) => {
  try{
    var where = '';
    if(parseInt(req.user.role,10) !== 0){
      var branches = req.user.id_branch.split(",");
      if(branches.length>0){
        where = 'WHERE idbranch IN ("'+branches.join('","')+'")';
      }else{
        where = 'WHERE idbranch IN ("'+branches.join()+'")';
      }
    }
    const data = await db.query('SELECT id,windowid,winno,idoperator,idbranch,worktitle FROM window_state  '+where+'');
    if(data.length>0){
      return res.status(200).send({ type: "ok", data: data });
    }else{
      return res.status(200).send({ type: "error", message: 'Пусто'});
    }
  }catch (err){
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }

});
export default router;
