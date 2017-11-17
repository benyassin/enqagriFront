/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4.0.0-Alpha 6
Version: 3.0.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v3.0/admin/angularjs4/
*/

var handleEmailToInput = function() {
    $('#email-to').tagit({
        availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"]
    });
};

var handleEmailContent = function() {
    $('#wysihtml5').wysihtml5();
};

var EmailCompose = function () {
	"use strict";
    return {
        //main function
        init: function () {
            $.getScript('assets/plugins/jquery-tag-it/js/tag-it.min.js').done(function() {
                handleEmailToInput();
            });
            
            $.getScript('assets/plugins/bootstrap-wysihtml5/dist/bootstrap3-wysihtml5.all.min.js').done(function() {
                handleEmailContent();
            });
        }
    };
}();