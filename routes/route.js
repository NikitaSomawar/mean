const express = require('express');
var mysql = require('mysql');
const router = express.Router();
var bodyparser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mean"
  });

//**********************************************************************************************************


router.post('/login',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var result;
  var sess = {};
  if(!req.session.visitcount)
  {
    req.session.visitcount = 1;
  }
  else
  {
    req.session.visitcount++;
  }
  
  var query = con.query("select * from tbl_user where (username='"+username +"' or email='"+username+"' or contact='"+username+"')and password='"+password+"'",function(err,result,fields){
    
    var rows = result.length;
    if(rows == 1)
    {
      postvalue = {
        "status":"200",
        "result":result
      }
     
      res.json(postvalue);
    }
    else if(rows>1)
    {
      postvalue = {
        "status":"409",
        "msg":"more than one user"
      }
      res.json(postvalue);
    }
    else
    {
      postvalue = {
        "status":"204",
        "msg":"no user found"
      }
      res.json(postvalue);
    }
  });
  console.log(query.sql);
})

//**********************************************************************************************************

router.get('/contacts',function(req,res){
   
    con.query("SELECT * FROM contacts", function (err, result, fields) {
        if (err) throw err;
       postvalue = {
         "status":"200",
         "result":result
       }
       //console.log(req.session);
        res.json(postvalue);
      });
   
   
});

//**********************************************************************************************************

router.post('/addcontact',function(req,res){

    var name = req.body.name;
    console.log('print name'+ name);
    var contact = req.body.contact;
    var sql = "INSERT INTO contacts (name, contact) VALUES ?";
    var values = [
        [name,contact]
    ];
    con.query(sql,[values], function (err, result) {
      if (err) throw err;
      
      res.json("hi");
     // console.log("1 record inserted");
      //res.send('contact added successfully');
    });
});


//**********************************************************************************************************

router.put('/updatecontact',function(req,res){

  var name = req.body.name;
  var contact = req.body.contact;
  var id = req.body.id;
  var sql = "update contacts set name='"+name+"',contact='"+contact+"' where id="+id;
  console.log(sql);
 con.query(sql, function (err, result) {
    if (err) throw err;
    
    res.json("hi");
   // console.log("1 record inserted");
    //res.send('contact added successfully');
  });
});

//**********************************************************************************************************

router.delete('/deletcontact/:id',function(req,res){
    var id = req.params.id;
    var sql = "delete from contacts where id ="+id;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
       // console.log("1 record deleted");
       // res.send('record deleted successfully');
      });
});

//**********************************************************************************************************

router.post('/register',function(req,res){
  var check_count
  var username = req.body.username;
  var email = req.body.email;
  var contact = req.body.contact;
  var password = req.body.password;
  var contact = req.body.contact;

  var check = con.query("select * from tbl_user where (username='"+username +"' or email='"+username+"' or contact='"+username+"')",function(err,result,fields){
  this.check_count = result.length;
  });

  if(check_count==0)
  {

      var sql = "INSERT INTO tbl_user (username, contact,email,password) VALUES ?";
      var values = [
          [username,contact,email,password]
      ];
      var query = con.query(sql,[values], function (err, result) {
        if (err){
          postvalue = {
            "status":"204",
            "result":"error while inserting"
          }
        }
        else
        {
          postvalue = {
            "status":"200",
            "result":"ok"
          }
        }
        //res.json("postvalue");
        res.json(postvalue);
      // console.log("1 record inserted");
        //res.send('contact added successfully');
      });
      console.log(query.sql);
  }
  else
  {
    postvalue = {
      "status":"409",
      "result":"User with this username is already present"
    }
    res.json(postvalue);
  }
});

//**********************************************************************************************************



router.get('/logout',function(req,res){
  req.session.destroy();
  console.log("sessions are:"+ req.session);
  postvalue = {
    "status":"200"
  }
   res.json(postvalue);
 
});

//**********************************************************************************************************

router.get('/product_list',function(req,res){
   
  con.query("SELECT * FROM products", function (err, result, fields) {
      if (err)
      {
        postvalue = {
          "status":"204",
          "result":"error in query"
        }
      }
      else
      {
          postvalue = {
            "status":"200",
            "result":result
          }
      }
     //console.log(req.session);
      res.json(postvalue);
    });
 
 
});

//**********************************************************************************************************


router.post('/addtocart',function(req,res){
  var user_id = req.body.user_id;
  //console.log('user id'+ user_id);
  var product_id = req.body.product_id;
  var check_count;
var check = con.query("select * from cart where user_id='"+user_id +"' and product_id='"+product_id+"'",function(err,result,fields){
  check_count = result.length;
  
        console.log(check.sql);
        console.log(check_count);
        if(check_count >=1)
        {
          postvalue = {
            "status":"409",
            "result":"product is already in cart"
          }
          res.json(postvalue);
         
        }
        else
        {
          var sql = "INSERT INTO cart (user_id, product_id) VALUES ?";
          var values = [
              [user_id,product_id]
          ];
          con.query(sql,[values], function (err, result) {
            if (err) throw err;
            postvalue = {
              "status":"200",
              "result":"added to cart"
            }
            res.json(postvalue);
          });
        }
  });
});


//**********************************************************************************************************


router.post('/get_cart_products',function(req,res){
   user_id = req.body.user_id;
 var cart_list =  con.query("select * from cart as c inner join products as p on c.product_id=p.product_id where user_id='"+user_id+"'", function (err, result, fields) {
    rows = result.length;  
    if (rows == 0)
      {
        postvalue = {
          "status":"204",
          "result":"no products available in cart"
        }
      }
      else
      {
          postvalue = {
            "status":"200",
            "result":result
          }
      }
     //console.log(req.session);
      res.json(postvalue);
    });
    console.log(cart_list.sql);
});

//**********************************************************************************************************


router.delete('/removefromcart/:id',function(req,res){
  var id = req.params.id;
  var sql = "delete from cart where cart_id ="+id;
  con.query(sql, function (err, result) {
      if (err) throw err;
      postvalue = {
        "status":"200",
        "result":"ok"
      }
      res.json(postvalue);
     // console.log("1 record deleted");
     // res.send('record deleted successfully');
    });
});


//**********************************************************************************************************




module.exports = router;