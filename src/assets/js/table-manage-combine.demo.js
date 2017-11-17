/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4.0.0-Alpha 6
Version: 3.0.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v3.0/admin/angularjs4/
*/

var handleDataTableCombinationSetting = function() {
	"use strict";
    
    if ($('#data-table').length !== 0) {
        $('#data-table').DataTable({
            dom: 'lBfrtip',
            buttons: [
                { extend: 'copy', className: 'btn-sm' },
                { extend: 'csv', className: 'btn-sm' },
                { extend: 'excel', className: 'btn-sm' },
                { extend: 'pdf', className: 'btn-sm' },
                { extend: 'print', className: 'btn-sm' }
            ],
            responsive: true,
            autoFill: true,
            colReorder: true,
            keys: true,
            rowReorder: true,
            select: true
        });
    }
};

var TableManageCombine = function () {
	"use strict";
    return {
        //main function
        init: function () {
            $.getScript('assets/plugins/DataTables/media/js/jquery.dataTables.js').done(function() {
                $.getScript('assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js').done(function() {
                    $.getScript('assets/plugins/DataTables/extensions/Buttons/js/dataTables.buttons.min.js').done(function() {
                        $.getScript('assets/plugins/DataTables/extensions/Buttons/js/buttons.bootstrap.min.js').done(function() {
                            $.getScript('assets/plugins/DataTables/extensions/Buttons/js/buttons.flash.min.js').done(function() {
                                $.getScript('assets/plugins/DataTables/extensions/Buttons/js/jszip.min.js').done(function() {
                                    $.getScript('assets/plugins/DataTables/extensions/Buttons/js/pdfmake.min.js').done(function() {
                                        $.getScript('assets/plugins/DataTables/extensions/Buttons/js/vfs_fonts.min.js').done(function() {
                                            $.getScript('assets/plugins/DataTables/extensions/Buttons/js/buttons.html5.min.js').done(function() {
                                                $.getScript('assets/plugins/DataTables/extensions/Buttons/js/buttons.print.min.js').done(function() {
                                                    $.getScript('assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js').done(function() {
                                                        $.getScript('assets/plugins/DataTables/extensions/AutoFill/js/dataTables.autoFill.min.js').done(function() {
                                                            $.getScript('assets/plugins/DataTables/extensions/ColReorder/js/dataTables.colReorder.min.js').done(function() {
                                                                $.getScript('assets/plugins/DataTables/extensions/KeyTable/js/dataTables.keyTable.min.js').done(function() {
                                                                    $.getScript('assets/plugins/DataTables/extensions/RowReorder/js/dataTables.rowReorder.min.js').done(function() {
                                                                        $.getScript('assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js').done(function() {
                                                                            handleDataTableCombinationSetting();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    };
}();