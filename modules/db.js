// npm install mysql
var mysqlModule = require('mysql');

//configure the connection
var _con = mysqlModule.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fh98hfeh98f3hf3FH%$#',
    database: 'todo_app'
});
// take care on general errors
_con.on('error',function(err){
    console.error('Fatal mysql occured');
    console.log(err);
});

//actual connect
_con.connect();
//expose mysql
module.exports = _con;
