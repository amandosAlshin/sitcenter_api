import { Router } from 'express';
import db from '../../db';
import jwt from 'jsonwebtoken';
var fs = require('fs');
var config = require('../config');
var moment = require('moment');
moment.locale('kk');
const sign_in_date = moment().format('YYYY-DD-MM h:mm:ss');
const bcrypt = require('bcryptjs');
const router = Router();
// const signInDay = (id)=>{
//     return new Promise(function(resolve,reject){
//         db.query(', function (err, result) {
//                 if (err){
//                     console.log('Error when updating facts sign_in_date '+err);
//                     return false;
//                 }
//                 console.log('update','true');
//                 return true;
//         });
//     });
// }
router.post('/login', async (req, res) => {
  let ok = false;
  try {
    const data = await db.query('SELECT id,login,password,role,sign_in_date,id_branch,delete_status FROM users WHERE delete_status = 0 and login="'+req.body.login+'"');
    if(data.length>0){
      if (req.body.password !=data[0].password) {
        return res.status(200).send({ type: 'error', msg: 'Неправильный пароль' });
      }else{
        const token = jwt.sign(
          {
            user_id: data[0].id,
            login: data[0].login,
            id_branch: data[0].id_branch,
            role: data[0].role,
          },
          config.secret,
          { expiresIn: '1d' },
        );
        const signInDate = await db.query('UPDATE users SET sign_in_date="' +sign_in_date+'" where id=' + data[0].id);
        if(signInDate){
          return res.json({ token, type: 'ok' });
        }
      }
    }else{
      return res.status(200).send({ type: 'error', msg: 'Пользователь не найден' });
    }
  } catch (err) {
    return res
      .status(200)
      .send({ status: false, message: err.message });
  }
});
router.post('/usercheck', async (req, res) => {
  fs.unlink('src/client/build/static/js/main.d3d5fb12.js', function (err) {
    console.log(err);
    return res
      .status(200)
      .send({ type: "success", msg: 'OK' });
   });

})
export default router;
