/* global http */
/* exported InitProfile */

/**
 * set up realtime connection with server
 */


// 	var fields = ['familyname', 'givenname', 'email', 'company', 'department', 'street', 'postcode', 'city', 'countrytxt', 'password', 'resetPasswordToken', 'resetPasswordExpires'];

"use strict";

function InitJoboffer() {


    var that = {};
    that.setup = function () {

        var input = dom('input', {

            name: jobTitle,
            class: 'jobInput'
        }, '');
        // greife auf jade / html id jobcontent zu
        var jobContent = document.getElementById("jobcontent");
        jobContent.appendChild(input);

    }
    return that;
}

window.addEventListener('load', function () {
    InitJoboffer().setup();
});