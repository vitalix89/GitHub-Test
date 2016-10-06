
/*

var http = require('http');
var htmlencode = require('htmlencode');
var rndClr = require('just.randomcolor');

var express = require('express');

var app = express();


var session = require('express-session');



app.use(session({
    secret: 'A secret key [super private!]',
    resave: false, //do not save the session if user did not make changed
    saveUninitialized: false //do not save session on Uninitialized
}));

var router = express.Router();


//router.get('/chat.html', function(req, res) {

    console.log('cccccaaaa')

//});

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var mmm = today.getMinutes();
var hh =today.getHours();
if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = yyyy+'-'+mm+'-'+dd+ ':' +' '+ hh+':'+mmm;


//configure empty http server
var httpServer = http.createServer(function(rq, rs) {});
httpServer.listen(1337, function() {
    console.log('server suka started on 1337');
});

//configure the WS server to attach itself into the http server
var webSocketServer = require('websocket').server;
var ws = new webSocketServer({
    "httpServer": httpServer
});



var clients = [];
ws.on('request', function(req) {
    //this hold the client connection
    var connection = {
       connection: req.accept(null, req.origin),
        userId: 6
    }

   // console.log(req)


    console.log(req.session)





    var userCon ={
      con: connection.connection,
      color: new rndClr().toHex().value,
        userId:connection.userId
    };
    //store the connection into clients array
    clients.push(userCon);
    //console.log('suka');
    //send response
    connection.connection.sendUTF("Conn established"+' '+today );

   // console.log(userCon);

    //take care on clients messages
    connection.connection.on('message', function(msg) {
        // sanitize the message from XSS
        var msgObj = {
          text: htmlencode.htmlEncode(msg.utf8Data),
          color: userCon.color,
            user:clients.userId
        }
        var msgText = JSON.stringify(msgObj);
        for (var i = 0; i < clients.length; i++) {
            //get one of the clients connecion
            var usercon = clients[i].con;
           // var userID = clients[i].userId

            usercon.sendUTF(msgText);
          //  console.log(clients[i].userId)
        }
    })

})









module.exports = router;
*/
