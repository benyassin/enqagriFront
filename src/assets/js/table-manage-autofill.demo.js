/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4.0.0-Alpha 6
Version: 3.0.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v3.0/admin/angularjs4/
*/

var handleDataTableAutofill = function() {
	"use strict";
    
    if ($('#data-table').length !== 0) {
        $('#data-table').DataTable({
            autoFill: true,
            responsive: true
        });
    }
};

var TableManageAutofill = function () {
	"use strict";
    return {
        //main function
        init: function () {
            $.getScript('assets/plugins/DataTables/media/js/jquery.dataTables.js').done(function() {
                $.getScript('assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js').done(function() {
                    $.getScript('assets/plugins/DataTables/extensions/AutoFill/js/dataTables.autoFill.min.js').done(function() {
                        $.getScript('assets/plugins/DataTables/extensions/AutoFill/js/autoFill.bootstrap.min.js').done(function() {
                            $.getScript('assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js').done(function() {
                                handleDataTableAutofill();
                            });
                        });
                    });
                });
            });
        }
    };
}();