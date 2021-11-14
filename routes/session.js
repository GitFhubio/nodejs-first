var express = require('express');
var router = express.Router();

const executeQuery=require('../modules/sqlscript.js');
const session=require('express-session');
router.use(session({secret:'asdsd'}))
/* GET users listing. */
router.get('/', function(req, res, next) {
  //con questo if (!req.session) redirect posso proteggere rotte private
   if(req.session.user) {
  return res.render('user',{name: req.session.user})}
  return res.redirect('/');  //redirect alla root base
 });
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  let name = req.body.username;
  let psw=req.body.password;
  executeQuery(`select id from users where name = '${name}' and password= '${psw}'`,function(error,results){
    if(error) throw error;
    results=JSON.parse(JSON.stringify(results));
    if (results.length == 0){
      res.send('nome o password incorretti')
    } else{
      req.session.user=name; //creo variabile user nella sessione col nome dello user
      res.redirect('/session')
    }
  })

});
router.get('/users', function(req, res, next) {
 executeQuery("select * from users",function(error,results){
   if(error) throw error;
   results=JSON.parse(JSON.stringify(results));
  //  results = Object.values(JSON.parse(JSON.stringify(results)));
   res.render('users',{res:results})

 })
});
router.get('/users', function(req, res, next) {
  executeQuery("select * from users",function(error,results){
    if(error) throw error;
    results=JSON.parse(JSON.stringify(results));
   //  results = Object.values(JSON.parse(JSON.stringify(results)));
    res.render('users',{res:results})
 
  })
 });

 router.get('/logout', function(req, res, next) {
    if(req.session.user){
    req.session.user=null; //distruggo variabile di sessione
    req.session.destroy();
    }
     return res.redirect('/');  //il return è evitabile
 });
// esempio per evitare injection ***
// router.get('/users/:email', function(req, res, next) {
//   // executeQuery(`select * from users where email= '${req.params.email}'`,function(error,results){
//      executeQuery(`select * from users where email=?`,[req.params.email],function(error,results){
//     //  example [req.params.name,req.params.email]
//       if(error) throw error;
//     results=JSON.parse(JSON.stringify(results));
//    //  results = Object.values(JSON.parse(JSON.stringify(results)));
//     res.render('myuser',{res:results[0]})
 
//   })
//  });
 router.get('/pippobaudo', function(req, res, next) {
  res.writeHead(302,{
    'Location' : '/registrati'
  })
  res.end();

  //o semplicemente res.redirect('/registrati')
});

module.exports = router;
