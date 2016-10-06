var express = require('express');
var router = express.Router();
module.exports = router;


router.post('/register', function(req, res) {
    // req.body is a JSON object that will be populated into the insert
    con.query("INSERT INTO users SET ?", req.body, function(err, result) {
        // should be translated to:
        // INSERT INTO users SET name="demo",email="demo@domain.com",password="1234"
        if (err) {
            //print the error to the consle
            console.error(err);
            //send false to the user
            res.send(JSON.stringify({
                success: false
            }));
        } else {
            res.json({
                id: result.insertId,
                success: true
            });
        }
    });
});

router.post('/check', function(req, res) {
    res.json({
        success: typeof req.session.userData === 'Object'
    });
});

// /auth/checkEmail/email@something.com
router.get('/checkEmail/:email', function(req, res) {
    var email = req.params.email;
    con.query("SELECT email FROM users WHERE email=?", email, function(err, result) {
        if (err) {
            //print the error to the consle
            console.error(err);
        } else {
            res.json({
                exists: result.length > 0 ? true : false
            });
        }
    });

});


router.post('/login', function(req, res) {
    //for convenient
    var data = req.body;

    console.log(data);

   // console.log(data.email);
    con.query("SELECT u_id , u_first FROM users WHERE u_email=? AND u_password=?", [data.u_email, data.u_password], function(err, result) {
        // should be translated to:
        // INSERT INTO users SET name="demo",email="demo@domain.com",password="1234"
        if (err) {
            //print the error to the consle
            console.error(err);
        }
        var answer = false;
        //record had returned - so user is logged in

        if (result.length == 1) {
            console.log( 'bla');

            answer = true;
            //create the property userData in the session and store the user object into it
            req.session.userData = result[0]; //get the first user record
           // console.log(result[0].name);


        } else { // login failed
            answer = 'suka';
        }

        res.json({
            success:answer,
            result:result
        });

    });
});




/*router.post('/messages_to_db', function(req, res) {

    //var data = req.body;

    //console.log(data);


    // req.body is a JSON object that will be populated into the insert
    con.query("INSERT INTO messages SET ?",  req.body, function(err, result) {
        // should be translated to:
        // INSERT INTO users SET name="demo",email="demo@domain.com",password="1234"
        if (err) {
            //print the error to the consle
            console.error(err);
            //send false to the user
            res.send(JSON.stringify({
                success: false
            }));
        } else {
            res.json({
                id: result.insertId,
                success: true
            });
        }
    });
});*/
