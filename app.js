var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();
var Session = require('express-session');
var MemoryStore =Session.MemoryStore;
app.use(Session({secret: 'rtrtrgrter', saveUninitialized: true, resave: false,store: new MemoryStore(),cookie: {
  path: '/',
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
  signed: false
},}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var path = require('path');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mean"
});

con.connect(function(err) {
  
  console.log(err);
});




//const port = 3000;

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


const route = require('./routes/route');

app.use('/api',route);

app.get('/',function(req,res){
res.send('works');
});





var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mean"
});



var http=require('http');
var paypal = require('paypal-rest-sdk');
var transaction_values = [];
//var cart_items_to_remove = [];
var port = Number(process.env.PORT ||8000);

app.locals.baseurl = 'http://localhost:3000';
 
// paypal auth configuration
var config = {
  "port" : 8000,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : "AZjaFzSviZ6-QvyIPPhgETUTO301OdiXulwzY2rVXKye6SgAyQIFMkzOYu37VyE067XFA1ge-qt4mDv3",  // your paypal application client id
    "client_secret" : "EDxIJQitACq1aS8XlZ6NlJ2NYMCu9Z-h75LqcsD5UogRGWgVBOeWb1daVmIisVPYZRy_dLSfVVJD0UNF" // your paypal application secret id
  }
}
 
paypal.configure(config.api);

app.post('/paynow', function(req, res) {
  transaction_values['total'] = parseInt(req.body.amount);
  transaction_values['currency'] = req.body.currency;
  transaction_values['user_id'] = req.body.user_id;
  // paypal payment configuration.
total= parseInt(req.body.amount);
currency = req.body.currency;
var payment = {
"intent": "sale",
"payer": {
 "payment_method": "paypal"
},
"redirect_urls": {
 "return_url": app.locals.baseurl+"/success",
 "cancel_url": app.locals.baseurl+"/cancel"
},
"transactions": [{
 "amount": {
 "currency":currency,
   "total":total
   
 },
 "description": req.body.description
}]
};
paypal.payment.create(payment, function (error, payment) {
 //var data = { "success":payment} 


if (error) {
  var data = { "status":'204',"msg":"error on create payment"} 
} else {
 
 if(payment.payer.payment_method === 'paypal') {
   req.paymentId = payment.id;
   var redirectUrl;
   //console.log(payment);
   for(var i=0; i < payment.links.length; i++) {
     var link = payment.links[i];
 //console.log(link);
     if (link.method === 'REDIRECT') {
      // redirectUrl = link.href;
       var data = { "status":'200',"msg":link.href} 
 
     }
   }
   //res.redirect(redirectUrl);
 }
}
res.end( JSON.stringify(data));
});

});

//**********************************************************************************************************

app.get('/success', function(req, res) {
  /// res.send("Payment transfered successfully.");
  console.log(req.query);
  const payerid = req.query.PayerID;
  const payment = req.query.paymentId;
  const execute_payment_json = {
    "payer_id":payerid,
    "transactions" : [{
      "amount" :{
       "currency":transaction_values['currency']  ,
       "total":transaction_values['total']
      }
    }]
    
  }
  
  paypal.payment.execute(payment, execute_payment_json,function (error, payment) {
     if (error) {
         console.log(error.response);
     throw error;
     } else {
     console.log("get response");
     console.log(JSON.stringify(payment));
     res.send("Payment transfered successfully.");
     var sql = "delete from cart where user_id="+transaction_values['user_id'];
     con.query(sql, function (err, result) {
         if (err) throw err;
         console.log('items from cart deleted');
        // res.json(result);
        // console.log("1 record deleted");
        // res.send('record deleted successfully');
       });
     }
 });
  
  
 });

app.listen(port,()=>{
console.log('listing to port'+port);
});