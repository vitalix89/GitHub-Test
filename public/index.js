$(document).ready(function() {
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#emailreg').change(function() {
        var that = this;
        var email = this.value;
        //user haven't provided an email
        if (!email) {
            return;
        }
        jsonAjax('auth/checkEmail/' + email, 'GET', null, function(res) {
            if (res.exists) {
                $(that).addClass('error');
                alert('Email exists');
            }
        });
    });

    $('#register-submit').click(function(e) {
        //TODO: validate the form
        //create a json object from the form
        var jsonObj = formToJson('#register-form');
        //send the json object to the server
        jsonAjax("/auth/register", "POST", jsonObj, function(res) {
            //on success show the login form
            $('#login-form-link').click();
        });
    });

    $('#login-submit').click(function(e) {
        //TODO: validate the form
        //create a json object from the form
        var jsonObj = formToJson('#login-form');
        //send the json object to the server
        jsonAjax("/auth/login", "POST", jsonObj, function(res) {
            if (res.success) {
                //login is success redirect to chat
                location.href = "/chat/chat.html";
            } else {
                //TODO: add login failed message
                alert('no good!');
            }
        });
    });


});
/**
 * Created by MosheMelih on 13-Jul-16.
 * @link http://stackoverflow.com/a/17784656
 */

function formToJson(formSelector) {
    var data = {};
    $(formSelector).serializeArray().map(function(x) {
        data[x.name] = x.value;
    });
    return data;
}
/**
 * json ajax wrapper. this fnution is a jquery ajax quicky
 */
function jsonAjax(url, method, jsonObj, successCB) {
    $.ajax({
        type: method,
        url: url,
        data: jsonObj ? JSON.stringify(jsonObj) : null,
        contentType: "application/json; charset=UTF-8",
        datatype: "json",
        success: successCB,
        error: function() {

        }
    });
}
