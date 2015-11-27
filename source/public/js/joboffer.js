/* global http */
/* exported InitProfile */

/**
 * set up realtime connection with server
 */


// 	var fields = ['familyname', 'givenname', 'email', 'company', 'department', 'street', 'postcode', 'city', 'countrytxt', 'password', 'resetPasswordToken', 'resetPasswordExpires'];

// pseudo database
var mockdata = [{ jobTitle: 'myfirsttitle' }, { jobTitle: 'mysecondtitle' }];


"use strict";

function InitJoboffer() {


    var that = {};
    that.setup = function (jobData) {
        for (var i = 0; i < jobData.length; i++) {

            var job = jobData[i];

            // create fields with dom
            var input = dom('input', {name: 'jobTitle',class: 'jobInput'}, '');
            var changeBtn = dom('button', {}, 'change');
            var deleteBtn = dom('button', {}, 'delete');

            // put everything into div
            var jobContainer = dom('div', {}, input, changeBtn, deleteBtn);

            // delete job function
            deleteBtn.jobIndex = i;
            deleteBtn.addEventListener('click', function (e) {
                console.log(e.target.jobIndex);
                jobData.splice(e.target.jobIndex, 1);
                removeChildren(jobContent);
                that.setup(jobData);
            });
            
            // access jade / html id jobcontent
            input.value = job.jobTitle;
            var jobContent = document.getElementById("jobcontent");
            jobContent.appendChild(jobContainer);
        }
    }
    return that;
}

window.addEventListener('load', function () {
    InitJoboffer().setup(mockdata);
});