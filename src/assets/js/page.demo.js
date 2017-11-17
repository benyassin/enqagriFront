/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4.0.0-Alpha 6
Version: 3.0.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v3.0/admin/angularjs4/

01. Calendar Page
02. Chart D3 Page
03. Chart Flot Page
04. Chart JS Page
05. Chart Morris Page
06. Coming Soon Page
07. Dashboard V1 Page
08. Dashboard V2 Page
09. Email Compose Page
10. Email Inbox Page
11. Email Inbox V2 Page
12. Form Plugins Page
13. Form Plugins Page
14. Summernote Page
15. WYSIWYG Page
16. Full Height Page Page
17. Gallery V1 Page Page
18. Gallery V1 Page Page
19. Login V2
20. Map Google
21. Map Vector
22. Page with Two Sidebar
23. Table Manage Autofill
24. Table Manage Buttons
25. Table Manage ColReorder
26. Table Manage Combine
27. Table Manage Default
28. Table Manage Fixed Header
29. Table Manage Fixed Columns
30. Table Manage KeyTable
31. Table Manage Responsive
32. Table Manage RowReorder
33. Table Manage Scroller
34. Table Manage Select
35. Tree View
36. Intro JS
37. UI Modal Notification
*/



/* 01. Calendar Page
------------------------------------------------ */
window.addEventListener('calendar-ready', function(e) {
    $.getScript('/assets/js/calendar.demo.min.js').done(function() {
        Calendar.init();
    });
});


/* 02. Chart D3 Page
------------------------------------------------ */
window.addEventListener('chart-d3-ready', function(e) {
    $.getScript('/assets/js/chart-d3.demo.min.js').done(function() {
        ChartNvd3.init();
    });
});


/* 03. Chart Flot Page
------------------------------------------------ */
window.addEventListener('chart-flot-ready', function(e) {
    $.getScript('/assets/js/chart-flot.demo.min.js').done(function() {
        ChartFlot.init();
    });
});


/* 04. Chart JS Page
------------------------------------------------ */
window.addEventListener('chart-js-ready', function(e) {
    $.getScript('/assets/js/chart-js.demo.min.js').done(function() {
        ChartJs.init();
    });
});


/* 05. Chart Morris Page
------------------------------------------------ */
window.addEventListener('chart-morris-ready', function(e) {
    $.getScript('/assets/js/chart-morris.demo.min.js').done(function() {
        MorrisChart.init();
    });
});


/* 06. Coming Soon Page
------------------------------------------------ */
window.addEventListener('page-extra-coming-soon-ready', function(e) {
    $.getScript('/assets/js/coming-soon.demo.min.js').done(function() {
        ComingSoon.init();
    });
});


/* 07. Dashboard V1 Page
------------------------------------------------ */
window.addEventListener('dashboard-v1-ready', function(e) {
    $.getScript('/assets/js/dashboard.min.js').done(function() {
        Dashboard.init();
        App.initComponent();
    });
});


/* 08. Dashboard V2 Page
------------------------------------------------ */
window.addEventListener('dashboard-v2-ready', function(e) {
    $.getScript('/assets/js/dashboard-v2.min.js').done(function() {
        DashboardV2.init();
        App.initComponent();
    });
});


/* 09. Email Compose Page
------------------------------------------------ */
window.addEventListener('email-compose-ready', function(e) {
    $.getScript('/assets/js/email-compose.demo.min.js').done(function() {
        EmailCompose.init();
        App.initComponent();
    });
});


/* 10. Email Inbox Page
------------------------------------------------ */
window.addEventListener('email-inbox-v1-ready', function(e) {
    $.getScript('/assets/js/email-inbox.demo.min.js').done(function() {
        Inbox.init();
        App.initComponent();
    });
});


/* 11. Email Inbox V2 Page
------------------------------------------------ */
window.addEventListener('email-inbox-v2-ready', function(e) {
    $.getScript('/assets/js/email-inbox-v2.demo.min.js').done(function() {
        InboxV2.init();
        App.initComponent();
    });
});

window.addEventListener('formulaire-ready', function(e) {
    $.getScript('/assets/js/form-plugins.demo.min.js').done(function() {
        FormPlugins.init();
    });
});

window.addEventListener('bloc-ready', function(e) {
    $.getScript('/assets/js/bloc.min.js').done(function() {
        bloc.init();
    });
});
/* 12. Form Plugins Page
------------------------------------------------ */
window.addEventListener('form-plugins-ready', function(e) {
    $.getScript('/assets/js/form-plugins.demo.min.js').done(function() {
        FormPlugins.init();
    });
});


/* 13. Form Plugins Page
------------------------------------------------ */
window.addEventListener('form-slider-switcher-ready', function(e) {
    $.getScript('/assets/js/form-slider-switcher.demo.min.js').done(function() {
        FormSliderSwitcher.init();
    });
});


/* 14. Summernote Page
------------------------------------------------ */
window.addEventListener('form-summernote-ready', function(e) {
    $.getScript('/assets/js/form-summernote.demo.min.js').done(function() {
        FormSummernote.init();
    });
});


/* 15. WYSIWYG Page
------------------------------------------------ */
window.addEventListener('form-wysiwyg-ready', function(e) {
    $.getScript('/assets/js/form-wysiwyg.demo.min.js').done(function() {
        FormWysihtml5.init();
    });
});


/* 16. Full Height Page Page
------------------------------------------------ */
window.addEventListener('full-height-content-ready', function(e) {
    App.initComponent();
});


/* 17. Gallery V1 Page Page
------------------------------------------------ */
window.addEventListener('gallery-v1-ready', function(e) {
    $.getScript('/assets/js/gallery-v1.demo.min.js').done(function() {
        GalleryV1.init();
    });
});


/* 18. Gallery V1 Page Page
------------------------------------------------ */
window.addEventListener('gallery-v2-ready', function(e) {
    $.getScript('/assets/js/gallery-v2.demo.min.js').done(function() {
        GalleryV2.init();
    });
});


/* 19. Login V2
------------------------------------------------ */
window.addEventListener('page-login-v2-ready', function(e) {
    $.getScript('/assets/js/login-v2.demo.min.js').done(function() {
        LoginV2.init();
    });
});


/* 20. Map Google
------------------------------------------------ */
window.addEventListener('page-map-google-ready', function(e) {
    $.getScript('/assets/js/map-google.demo.min.js').done(function() {
        MapGoogle.init();
    });
});


/* 21. Map Vector
------------------------------------------------ */
window.addEventListener('page-map-vector-ready', function(e) {
    $.getScript('/assets/js/map-vector.demo.min.js').done(function() {
        MapVector.init();
    });
});


/* 22. Page with Two Sidebar
------------------------------------------------ */
window.addEventListener('sidebar-two-ready', function(e) {
    $.getScript('/assets/js/sidebar-two.demo.min.js').done(function() {
        SidebarTwo.init();
        App.initComponent();
    });
});


/* 23. Table Manage Autofill
------------------------------------------------ */
window.addEventListener('table-manage-autofill-ready', function(e) {
    $.getScript('/assets/js/table-manage-autofill.demo.min.js').done(function() {
        TableManageAutofill.init();
    });
});


/* 24. Table Manage Buttons
------------------------------------------------ */
window.addEventListener('table-manage-buttons-ready', function(e) {
    $.getScript('/assets/js/table-manage-buttons.demo.min.js').done(function() {
        TableManageButtons.init();
    });
});


/* 25. Table Manage ColReorder
------------------------------------------------ */
window.addEventListener('table-manage-colreorder-ready', function(e) {
    $.getScript('/assets/js/table-manage-colreorder.demo.min.js').done(function() {
        TableManageColReorder.init();
    });
});


/* 26. Table Manage Combine
------------------------------------------------ */
window.addEventListener('table-manage-combine-ready', function(e) {
    $.getScript('/assets/js/table-manage-combine.demo.min.js').done(function() {
        TableManageCombine.init();
    });
});


/* 27. Table Manage Default
------------------------------------------------ */
window.addEventListener('table-manage-default-ready', function(e) {
    $.getScript('/assets/js/table-manage-default.demo.min.js').done(function() {
        TableManageDefault.init();
    });
});


/* 28. Table Manage Fixed Header
------------------------------------------------ */
window.addEventListener('table-manage-fixed-header-ready', function(e) {
    $.getScript('/assets/js/table-manage-fixed-header.demo.min.js').done(function() {
        TableManageFixedHeader.init();
    });
});


/* 29. Table Manage Fixed Columns
------------------------------------------------ */
window.addEventListener('table-manage-fixed-columns-ready', function(e) {
    $.getScript('/assets/js/table-manage-fixed-columns.demo.min.js').done(function() {
        TableManageFixedColumns.init();
    });
});


/* 30. Table Manage KeyTable
------------------------------------------------ */
window.addEventListener('table-manage-keytable-ready', function(e) {
    $.getScript('/assets/js/table-manage-keytable.demo.min.js').done(function() {
        TableManageKeyTable.init();
    });
});


/* 31. Table Manage Responsive
------------------------------------------------ */
window.addEventListener('table-manage-responsive-ready', function(e) {
    $.getScript('/assets/js/table-manage-responsive.demo.min.js').done(function() {
        TableManageResponsive.init();
    });
});


/* 32. Table Manage RowReorder
------------------------------------------------ */
window.addEventListener('table-manage-rowreorder-ready', function(e) {
    $.getScript('/assets/js/table-manage-rowreorder.demo.min.js').done(function() {
        TableManageRowReorder.init();
    });
});


/* 33. Table Manage Scroller
------------------------------------------------ */
window.addEventListener('table-manage-scroller-ready', function(e) {
    $.getScript('/assets/js/table-manage-scroller.demo.min.js').done(function() {
        TableManageScroller.init();
    });
});


/* 34. Table Manage Select
------------------------------------------------ */
window.addEventListener('table-manage-select-ready', function(e) {
    $.getScript('/assets/js/table-manage-select.demo.min.js').done(function() {
        TableManageSelect.init();
    });
});


/* 35. Tree View
------------------------------------------------ */
window.addEventListener('ui-tree-view-ready', function(e) {
    $.getScript('/assets/js/ui-tree.demo.min.js').done(function() {
        TreeView.init();
        App.initComponent();
    });
});


/* 36. Intro JS
------------------------------------------------ */
window.addEventListener('ui-intro-js-ready', function(e) {
    $.getScript('assets/plugins/intro-js/intro.js');
});


/* 37. UI Modal Notification
------------------------------------------------ */
window.addEventListener('ui-modal-notification-ready', function(e) {
    $.getScript('/assets/js/ui-modal-notification.demo.min.js').done(function() {
		Notification.init();
		App.initComponent();
    });
});