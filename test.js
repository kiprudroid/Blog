const mysql = require('mysql');
const express = require('express')
const app = express()
var con = mysql.createConnection({
    host : 'localhost',
    user : 'shadrack',
    password : 'root',
    database : 'Posts'
});
var sql = "SELECT CURRENT_DATE()"
con.query(sql,(err,field,result)=>{
    if(err){
        console.log(err)
    }
    console.log(result)
    
})