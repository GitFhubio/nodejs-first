'use strict'
 module.exports=executeQuery;

 const mysql=require('mysql');
 const connection=mysql.createConnection({
     host:'127.0.0.1',
     user:'root',
     password:'root',
     port:8889,
     database:'node_example'
 })

 function executeQuery(sql,callback){
    //  connection.connect();
     connection.query(sql,callback);
    //  connection.end();
 }

// per evitare injection

//  function executeQuery(sql,params,callback){
//     //  connection.connect();
//      connection.query(sql,params,callback);
//     //  connection.end();
//  }