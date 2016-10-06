var express = require('express');

var router = express.Router();
// serve the chat file to logged in users
// /chat/chat.html
router.get('/chat.html', function(req, res) {

    //console.log(req)
    //if the user is not logged in do not serve the file
    if (!req.session.userData && false) {
        res.json({
            success: false,
            error: 'not logged in'
        });
    } else {
        res.sendFile(BASE_PATH + '/private/chat.html');

        console.log('aaaaaaa')
    }
});



router.get('/client.html', function(req, res) {
    //if the user is not logged in do not serve the file
    console.log('aaaaaaa')
        res.sendFile(BASE_PATH + '/public/client.html');



});




router.post('/getuserdata', function(req, res) {
    //if the user is not logged in do not serve the file
    if (!req.session.userData && false) {
        res.json({
            success: false,
            error: 'not logged in'
        });
    } else {


       // res.sendFile(BASE_PATH + '/private/chat.html');
        console.log('yesh session');

        res.json({
            data: req.session.userData,
            success: true
        });
    }


});




module.exports = router;
