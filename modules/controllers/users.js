var express = require('express');
var router = express.Router();
module.exports = router;






router.get('/all_users/:id', function(req, res) {
    // req.body is a JSON object that will be populated into the insert

    var id = req.params.id;

    console.log(id)


    if(isNumber(id)){
        con.query("SELECT * FROM users WHERE u_id=?", req.params.id , function(err, result) {
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
                console.log(result);
                res.json(result);
            }
        });


    }else{

        res.json({
            Error: 'type a number'
        });

    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
});








/*

router.get('/all_users_msg/:id', function(req, res) {
    // req.body is a JSON object that will be populated into the insert

    var id = req.params.id;

    console.log(id)


    if(isNumber(id)){
        con.query("SELECT messages.message FROM messages WHERE u_id=?", req.params.id , function(err, result) {
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
                console.log(result);
                res.json(result);
            }
        });


    }else{

        res.json({
            Error: 'type a number'
        });

    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
});


*/


var rese ={}

var i=0



router.post('/all_users_msg', function(req, res) {
    // req.body is a JSON object that will be populated into the insert

    var data = req.body;

   // i++

    console.log('u_id_suka'+data.u_id);

    /*SUPER QUERY:SELECT * FROM messages WHERE u_id=124 AND u_from=115 UNION SELECT * FROM messages WHERE messages.u_id=124 AND messages.u_id = messages.u_from*/

/*SELECT * FROM messages WHERE messages.u_id = messages.u_from*/
    /*super query(not includes duplicated values)--SELECT MIN(u_id), messages.u_from FROM messages WHERE u_id=115 GROUP BY u_from */


    /*SELECT * FROM messages WHERE u_id=124 AND u_from=115 UNION SELECT * FROM messages WHERE u_id=124 AND u_id = u_from
     */


    /* /*SELECT messages.m_id, messages.sander , messages.message , messages.u_from_name FROM messages WHERE EXISTS (SELECT messages.m_id, messages.sander , messages.message , messages.u_from_name FROM messages WHERE u_id=? AND u_from=? OR (u_id=? AND u_from=?) ORDER BY m_id )*/



    /*SELECT *FROM messages WHERE u_id=124 AND u_from=115 OR (u_id=124 AND u_id=u_from)
     */

    /*SELECT messages.m_id, messages.sander , messages.message , messages.u_from_name FROM messages WHERE u_id=? AND u_from=? UNION SELECT messages.m_id, messages.sander ,messages.message , messages.u_from_name FROM messages WHERE u_id=? AND u_from=? ORDER BY m_id */

    /* /*SELECT messages.m_id, messages.sander , messages.message , messages.u_from_name FROM messages WHERE EXISTS (SELECT messages.m_id, messages.sander , messages.message , messages.u_from_name FROM messages WHERE u_id=? AND u_from=? OR (u_id=? AND u_id= u_from) ORDER BY m_id )*/


    /*SELECT * FROM messages WHERE EXISTS( SELECT * FROM messages WHERE u_id=124 AND u_from=115 ) AND EXISTS( SELECT * FROM messages WHERE u_id=115 AND u_from = 115)
     */

  //  if(isNumber(id)){
    con.query("SELECT * FROM messages WHERE u_id=? AND u_from=? ORDER BY m_id", [data.u_id,data.u_from] , function(err, result) {



        /* con.query("SELECT * FROM messages WHERE u_id=? AND u_from=? ORDER BY m_id", [data.u_id,data.u_id] , function(err, result2) {*/

         // i++
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

                console.log('result'+result);

                if(result){

                    con.query("SELECT * FROM messages WHERE u_id=? AND u_from=? ORDER BY m_id ", [data.u_from,data.u_id] , function(err, result2) {



                        console.log('result2222'+result2);

                        console.log('type'+ typeof result2);

                        console.log('length'+ result2.length);



                        if(result2.length == 0){

                            console.log('nulll')
                        }else{

                            res.json(rese[i]=[result,result2]);
                        }



                    });



                    //  if(result.length==0){



                    }else{




                    console.log('gandon')


                }
               // console.log(result);
                //res.json(result);
            }
        });


  /*  }else{

        res.json({
            Error: 'type a number'
        });

    }*/

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
});






router.post('/all_users_friends_who_send', function(req, res) {
    // req.body is a JSON object that will be populated into the insert

    var data = req.body;

    console.log(data);

/*SELECT MIN(u_id), messages.u_from_name , messages.on_message ,messages.u_from FROM messages WHERE u_id=? GROUP BY on_message*/

    /*super query(not includes duplicated values)--SELECT MIN(u_id), messages.u_from FROM messages WHERE u_id=115 GROUP BY u_from */

    /*SELECT DISTINCT(`u_id`), `u_from`, `on_message`, `off_message` FROM `messages` WHERE u_id=115 AND on_message=1
     */


    /*UPDATE mytable
     SET    table_column = 'test';*/

    /*UPDATE messages SET on_message = 0*/

    //  if(isNumber(id)){
    con.query("SELECT DISTINCT(`u_id`), `u_from`, `has_message` ,`u_from_name` FROM `users_chat_mates` WHERE u_id=? ", [data.u_id] , function(err, result) {
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
            // console.log(result);
            res.json(result);
        }
    });


    /*  }else{

     res.json({
     Error: 'type a number'
     });

     }*/

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
});











router.post('/select_username_from_id', function(req, res) {
    // req.body is a JSON object that will be populated into the insert

    var data = req.body;

    console.log(data);

   
    con.query("SELECT `u_first` , `img`  FROM `users` WHERE u_id=? ", [data.u_id] , function(err, result) {
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
            // console.log(result);
            res.json(result);
        }
    });


   
});









router.post('/join_img_from_name', function(req, res) {
    // req.body is a JSON object that will be populated into the insert

    var data = req.body;

    console.log(data);

    /*SELECT users.img, users_chat_mates.u_id,users_chat_mates.u_from FROM users LEFT JOIN users_chat_mates ON users.u_id=users_chat_mates.u_from ORDER BY users.u_id
     */


    con.query("SELECT users.img, users_chat_mates.u_id,users_chat_mates.u_from,users_chat_mates.u_from_name,users_chat_mates.has_message FROM users LEFT JOIN users_chat_mates ON users.u_id=users_chat_mates.u_from WHERE (users_chat_mates.u_id=?)", [data.u_id] , function(err, result) {
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
            // console.log(result);
            res.json(result);
        }
    });



});























































router.post('/all_users_who_send', function(req, res) {
    // req.body is a JSON object that will be populated into the insert

    var data = req.body;

    console.log(data);




/*SELECT users.img, users_chat_mates.u_id,users_chat_mates.u_from FROM users LEFT JOIN users_chat_mates ON users.u_id=users_chat_mates.u_from ORDER BY users.u_id
 */

    /*join query test: SELECT users.u_first, messages.u_from
     FROM users
     LEFT JOIN messages
     ON users.u_id=messages.u_from
     ORDER BY users.u_first;*/

    /*the query:SELECT users.u_first, messages.u_from ,users.u_id,users.img FROM users LEFT JOIN messages ON users.u_id=messages.u_id
     */

    /*creaion table:CREATE TABLE result AS (SELECT users.u_first, messages.u_from ,users.u_id,users.img FROM users LEFT JOIN messages ON users.u_id=messages.u_id)*/


    /*super query(not includes duplicated values)--SELECT MIN(u_id), messages.u_from FROM messages WHERE u_id=115 GROUP BY u_from */

    //  if(isNumber(id)){
    con.query("SELECT MIN(u_id), messages.u_from,messages.u_from_name FROM messages WHERE u_id=? GROUP BY u_from", [data.u_id] , function(err, result) {
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
            // console.log(result);
            res.json(result);
        }
    });


    /*  }else{

     res.json({
     Error: 'type a number'
     });

     }*/

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
});



router.post('/get_details_u_from', function(req, res) {

    console.log(req.body);

    var data = req.body

    con.query("SELECT u_id, u_first , place_name , img ,logged_in FROM users WHERE u_id=? ", [data.u_id], function(err, result) {
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

            var username = result[0].name

            module.exports.username = username

        } else { // login failed
            answer = 'suka';
        }
        res.json(result);
    });



});















router.post('/all_users_except_me', function(req, res) {

    var data = req.body

    con.query("SELECT * FROM users WHERE NOT u_id = ?", data.u_id, function(err, result) {
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
           /* console.log(result);*/
            res.json(result);
        }
    });



});



router.post('/getusersbydistance', function(req, res) {

    console.log(req.body);

    var data = req.body

    con.query("SELECT u_first ,u_id ,place_name , img ,logged_in FROM users WHERE latitude1=? AND longtitude1=?", [data.latitude1, data.longtitude1], function(err, result) {
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

            var username = result[0].name

            module.exports.username = username

        } else { // login failed
            answer = 'suka';
        }
        res.json(result);
    });



});







router.get('/getallcordinates', function(req, res) {



   // var data = req.body

    con.query("SELECT users.latitude1,users.longtitude1 FROM `users`", function(err, result) {
        // should be translated to:
        // INSERT INTO users SET name="demo",email="demo@domain.com",password="1234"

      //  var suka={suka:'zain'}


        res.json(result);



      // console.log(result);
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






router.put('/update_cords', function(req, res) {

    var data = req.body;

    console.log(data);


    con.query("UPDATE users SET longtitude1=?, latitude1=? WHERE u_id = ?", [data.longtitude1 , data.latitude1 , data.u_id], function(err, result) {
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

            var username = result[0].name

            module.exports.username = username

        } else { // login failed
            answer = 'suka';
        }
        res.json({
            success: answer
        });
    });


});









/*router.put('/on_message', function(req, res) {

    var data = req.body;

   // console.log(data);


    con.query("UPDATE users SET on_message=? , u_from=? WHERE u_id = ?", [data.on_message,data.u_from , data.u_id], function(err, result) {
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

            var username = result[0].name

            module.exports.username = username

        } else { // login failed
            answer = 'suka';
        }
        res.json({
            success: answer
        });
    });


});*/


router.post('/insert_messages', function(req, res) {

    var data = req.body;

   console.log('suka u_from' +data.u_from);

  //  console.log(data.off_message)


    // req.body is a JSON object that will be populated into the insert
    con.query("INSERT INTO messages SET u_id = ?, u_from =?, u_from_name=?, message = ?, on_message=? ",  [data.u_id, data.u_from,data.u_from_name , data.message ,data.on_message], function(err, result) {
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







router.post('/insert_messages_to_myself', function(req, res) {

    var data = req.body;

    console.log('suka u_from' +data.u_from);

    //  console.log(data.off_message)


    // req.body is a JSON object that will be populated into the insert
    con.query("INSERT INTO messages SET u_id = ?, u_from =?, message = ? ,sander=?",  [data.u_id, data.u_id, data.message ,data.sander], function(err, result) {
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










router.post('/insert_to_users_mates', function(req, res) {

    var data = req.body;

   // console.log(data);

    /*alter table report add unique index(u_id, u_from);*//*this query not allowing for two identical rows to appear  */


   // con.query("SELECT u_from FROM users_chat_mates WHERE u_from=?", data.u_from , function(err, result) {

   /*     if(result.length > 0){


            con.query("UPDATE users_chat_mates SET has_message=?  WHERE u_from = ?", [data.has_message,data.u_from ], function(err, result) {
                // should be translated to:
                // INSERT INTO users SET name="demo",email="demo@domain.com",password="1234"
                if (err) {
                    //print the error to the consle
                    console.error(err);
                }
                var answer = false;
                //record had returned - so user is logged in

                res.json({
                    success: answer
                });
            });

        }else{*/

            con.query("INSERT INTO users_chat_mates SET u_id = ?, u_from =?, u_from_name=?, has_message=? ",  [data.u_id, data.u_from,data.u_from_name  ,data.has_message], function(err, result) {
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

      //  }


   // });






    // req.body is a JSON object that will be populated into the insert

});



router.put('/update_users_mates', function(req, res) {



    var data = req.body;



    con.query("UPDATE users_chat_mates SET has_message=?  WHERE u_from = ? AND u_id = ?", [data.has_message,data.u_from ,data.u_id ], function(err, result) {
        // should be translated to:
        // INSERT INTO users SET name="demo",email="demo@domain.com",password="1234"
        if (err) {
            //print the error to the consle
            console.error(err);
        }
        var answer = false;
        //record had returned - so user is logged in

        res.json({
            success: answer
        });
    });



});























router.put('/insert_from', function(req, res) {

    var data = req.body;

    console.log(data);


    // req.body is a JSON object that will be populated into the insert
    con.query("UPDATE users SET u_from =? WHERE u_id = ?",  [data.u_id, data.u_id], function(err, result) {
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




/*
router.put('/update_off_message', function(req, res) {

    var data = req.body;

    console.log(data);


    // req.body is a JSON object that will be populated into the insert
    con.query("UPDATE messages SET off_message =? WHERE u_from = ?",  [data.off_message, data.u_from], function(err, result) {
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
*/














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



/*
function requireLogin (req, res, next) {

    console.log('sukablat' +req.session.userData )
    if (!req.session.userData) {

        res.json({
            Error: 'suka no session'
        });
       /!* res.redirect('/login');*!/
    } else {
        next();
    }
};*/
