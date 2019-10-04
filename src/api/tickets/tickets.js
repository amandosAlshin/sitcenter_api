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

router.post('/tickets_list', async (req, res) => {

  try {
    var where = '';
    if(parseInt(req.user.role,10) !== 0){
      var branches = req.user.id_branch.split(",");
      if(branches.length>0){
        where = 'WHERE idbranch IN ("'+branches.join('","')+'")';
      }else{
        where = 'WHERE idbranch IN ("'+branches.join()+'")';
      }
    }

    const data = await db.query('SELECT'+
    '`id`,`id` as `key`,`eventid`,`ticketno`,`starttime`,`iin`,`redirected`,`targetoperatorid`,'+
    '`state`,`servover`,`waitover`,`startservtime`,`stopservtime`,'+
    '`additionalstatus`,`operator`,`windownum`,`rolestring`,`autocode`,'+
    '`idoperator`,`idqueue`,`rating`,`opinion`,`idbranch`,'+
    '`servicename`,`picnum`,`time`,`last`,`PreServOver`,`PreWaitOver`'+
    'FROM facts '+where+'');

    if(data.length>0){
      return res.status(200).send({ type: "ok", data: data });
    }else{
      return res.status(200).send({ type: "error", msg: 'Empty tickets'});
    }
  } catch (err) {
    return res
      .status(401)
      .send({ status: false, message: err.message });
  }
});
export default router;
