import path from 'path';
import express from 'express';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import { v1,user,tickets,services,employee,branch_list,main} from './api';
const app = express();
const port = 3000;
var config = require('./api/config');
var cors = require('cors')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/client/build/index.html')));
app.post('/api/*', jwt({ secret: config.secret}),
  (err,req, res,next) => {
    if(err){
      if(err.name = 'UnauthorizedError'){
          return res.sendStatus(401);
      }
    }
  }
)
var corsOptions = {
  origin: 'http://10.10.102.66:3006',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use('/auth/v1',cors(corsOptions), v1);

app.use('/api/user', cors(corsOptions), user);
app.use('/api/tickets',cors(corsOptions), tickets);
app.use('/api/services',cors(corsOptions), services);
app.use('/api/employee',cors(corsOptions), employee);
app.use('/api/branch',cors(corsOptions), branch_list);
app.use('/api/main',cors(corsOptions), main);
app.listen(port, () => console.log(`Server is listinging on localhost:${port}`));
