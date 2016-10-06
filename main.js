//get current folder as root
global.BASE_PATH = __dirname;


var express = require('express'),


    app = express(),



server = require('http').createServer(app),

    io = require('socket.io').listen(server);

var users_id ={};

server.listen(8080);


var bodyParser = require('body-parser');
//get connection, set into global so all the controllers would be able to use it
GLOBAL.con = require('./modules/db.js');
var session = require('express-session');

// expose the static content folder
app.use(express.static('public'));
// this middleware parse a json string into object and populate it into  req.body
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header ("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});




app.use(session({
    secret: 'A secret key [super private!]',
    resave: false, //do not save the session if user did not make changed
    saveUninitialized: false //do not save session on Uninitialized
}));



//any url that starts with '/auth' should been managed by this controller
// for example: '/auth/login','/auth/register'
var auth = require('./modules/controllers/auth');
app.use('/auth', auth);



/*app.use(function(req, res, next) {
    console.log('sukablat' +req.session.userData )
    if (!req.session.userData) {

        res.json({
            Error: 'suka no session'
        });
        /!* res.redirect('/login');*!/
    } else {
        console.log('sukablat' +req.session.userData )
        next();

    }
});*/




//this controller handle chat
var chat = require('./modules/controllers/chat');
app.use('/chat', chat);

//this controller handle chat



/*var ws = require('./modules/controllers/ws');

app.use('/ws', ws);*/


var users = require('./modules/controllers/users');

app.use('/users', users);


app.get('/users/all_users', session, function(req, res){
    // code for route handler goes here


});




io.on('connection', function(socket){

    socket.removeAllListeners();

    console.log('suka ithabarti');


    socket.on('user', function(user){

        //  var us = users.match(/.{1,3}/g)

        var cookie = socket.handshake.headers.cookie;
        console.log(cookie);


        console.log(user);

        socket.id = user;


        users_id[socket.id] = socket;


    });
    // console.log(users_id);

    io.sockets.emit("all_users_id",Object.keys(users_id) )

//    socket.on('user id',function(u_id){


    socket.on('message',function(data){



        console.log('suka data' +data)

        // socket.removeAllListeners()
        console.log('suka-bla'+data.u_first)

        var u_first = data.u_first

        var from =data.u_from;
        var id = data.u_id;
        var msg = data.msg;
        // var suka ='suka'
        if(id in users_id){


            console.log('ID BLA::'+id)
            console.log('whisper');

            users_id[id].emit("whisper", {u_id:id , message:msg, u_from:from, u_from_name:u_first, on_message:1 , has_message:1 } );



            //   users_id[id].emit("from", {u_id:from} );

            // io.sockets.emit("whisper",msg)

            //   io.sockets.emit("off message",{u_from:id , off_message:0})


        }else{

            console.log('suka enter valid user')

            socket.emit("whis",{u_id:id , message:msg, u_from:from, u_from_name:u_first, on_message:1})
        }

        socket.emit('myself', {message:msg,u_id:from, u_from:from,sander:1,shit:id});

        //io.sockets.emit("new message",msg)

        // io.emit("myself", {msg:msg});

        console.log('message: ' + msg);
    });

    //  });




    socket.on('disconnect', function(data){

        console.log(data);

        // users_id.splice(users_id.indexOf(socket.id),1)

        delete users_id[socket.id];
    });



});










