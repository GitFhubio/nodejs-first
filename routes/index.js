var express = require('express');
var router = express.Router();
const users = require('../users.json')
const multipart=require('connect-multiparty');
const executeQuery=require('../modules/sqlscript.js');
const multipartMiddleware=multipart({uploadDir:'./uploads'});
const session=require('express-session');
router.use(session({secret:'asdsd'}))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',number:234,array:['ciao','come','stai'] });
});
router.get('/registrati', function(req, res, next) {
  res.render('register', { });
});
router.post('/registrati', function(req, res, next) {
  executeQuery(`select id from users where email= '${req.body.email}'`,function(error,results){
    results=JSON.parse(JSON.stringify(results));
    if(results.length>0){
      res.send('la mail inserita già esiste')
    } else{
      executeQuery(`insert into users(name,email,password) values('${req.body.username}','${req.body.email}','${req.body.password}')`,function(err,result){
        res.send('utente registrato con successo')
    });
    }
});
});
router.post('/elleh', function(req, res, next) {
  let username=req.body.username;
  res.render('elleh', {date:new Date(),user:username});
});
router.get('/elleh', function(req, res, next) {
  console.log(users);
  let name=req.query.name; //inserisco nellurl ?name=pippo
  let user=users.find(el=> el.name==name);
// res.send(name)
// res.send(user);
res.render('user',user);
});
// o meglio 
router.get('/gettest/:name', function(req, res, next) {
  let name=req.params.name;
  let user=users.find(el=> el.name==name);
// res.send(name)
// res.send(user);
console.log(user);
res.render('user',user);
});

router.get('/upload', function(req, res, next) {
  res.render('upload', { });
});
router.post('/upload',multipartMiddleware,function(req, res, next) {
  res.render('upload', { fileName:req.files.filetoupload.name });
  // res.send('file caricato')
});

router.get('/accedi', function(req, res, next) {
  if(req.session.user){
    return res.redirect('/session'); // non ci richiede login se siamo loggati
  }
  res.render('login');
});

module.exports = router;
