const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const { JSON } = require('mysql/lib/protocol/constants/types');
const bcrypt = require('bcrypt');
const { promises } = require('dns');
const mysql = require('mysql');
const formidable = require('formidable');
const multer = require('multer');
const {upload} = require('./uploads')
// const field = require('./retrieve.js')
const ejs = require('ejs');


var con = mysql.createConnection({
    host : 'localhost',
    user : 'shadrack',
    password : 'root',
    database : 'Posts'
});

// console.log(field)
// const data ={
//     data : field
// }
// console.log(data)
//====================Use=====================\\
app.use(express.static('./public'))
app.use(express.static('./'))
app.use(express.urlencoded())

//=================View Engine=================\\


app.set('view engine', 'ejs');

//===============Routes=========================\\

app.get('/',(req,res)=>{
    var sql = "SELECT * FROM data ORDER BY ID DESC";
    con.query(sql,(err,data)=>{
        if(err){
            // console.log(err);
            throw err;
        }
        else{
            res.render('pages/index.ejs',{data : data});
        }
    })

    
// 
})


app.get('/admin',(req,res)=>{
    var sql = "SELECT * FROM data ORDER BY ID DESC";
    con.query(sql,(err,data)=>{
        if(err){
            // console.log(err);
            throw err;
        }
        else{
            res.render('pages/admin.ejs',{data : data});
        }
    })
})

app.get('/post',(req,res)=>{
    res.render('pages/posting.ejs')
})
app.get('/delete/:id',(req,res)=>{
    const {id} = req.params;
    const ID = Number(id)
    var sql = 'DELETE FROM data WHERE ID= ?'
    con.query(sql,[ID],(err,result)=>{
        if(err)
        {
            throw err;
        }
        else
        {
            console.log(result)
        }
        res.redirect('/admin')
    })
})

app.post('/submit-post', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    const test = req.body.desc ;
    var path = req.file.path;
    var sql = "INSERT INTO `data` (`ID`, `Date` , `image` ,`text` ) VALUES(Null,CURRENT_DATE(),?,?)"
    con.query(sql,[path,test],(err,result,field)=>{
        if(err) throw err;
        var x = result;
        console.log(err)
     })
    //res.redirect('/');
   
})

app.listen(5000,()=>{
    console.log('Server listening at http://localhost:5000')
    console.log('Server listening at http://localhost:5000/post')
    console.log('Server listening at http://localhost:5000/admin')
})
