import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html'
})

export class TopMenuComponent implements AfterViewInit { 
    // fire event sidebar-two-ready
    ngAfterViewInit() {
        window.dispatchEvent(new CustomEvent('top-menu-ready'));
    }
    
    menu = [{
        title: 'Dashboard',
        icon: 'fa fa-laptop',
        link: '',
        caret: 'true',
        submenu: [{
            title: 'Dashboard v1',
            link: '/dashboard/v1'
        },{
            title: 'Dashboard v2',
            link: '/dashboard/v2'
        }]
    },{
        title: 'Email',
        icon: 'fa fa-inbox',
        link: '',
        badge: '10',
        submenu: [{
            title: 'Inbox v1',
            link: '/email/inbox/v1'
        },{
            title: 'Inbox v2',
            link: '/email/inbox/v2'
        },{
            title: 'Compose',
            link: '/email/compose'
        },{
            title: 'Detail',
            link: '/email/detail'
        }]
    },{
        title: 'UI Elements',
        icon: 'fa fa-suitcase',
        link: '',
        label: 'NEW',
        caret: true,
        submenu: [{
            title: 'General',
            link: '/ui/general'
        },{
            title: 'Typography',
            link: '/ui/typography'
        },{
            title: 'Tabs & Accordions',
            link: '/ui/tabs-accordions'
        },{
            title: 'Unlimited Nav Tabs',
            link: '/ui/unlimited-nav-tabs'
        },{
            title: 'Modal & Notification',
            link: '/ui/modal-notification'
        },{
            title: 'Widget Boxes',
            link: '/ui/widget-boxes'
        },{
            title: 'Media Object',
            link: '/ui/media-object'
        },{
            title: 'Buttons',
            link: '/ui/buttons'
        },{
            title: 'Icons',
            link: '/ui/icons'
        },{
            title: 'Simple Line Icons',
            link: '/ui/simple-line-icons'
        },{
            title: 'Ionicons',
            link: '/ui/ionicons'
        },{
            title: 'Tree View',
            link: '/ui/tree-view'
        },{
            title: 'Language Bar & Icon',
            link: '/ui/language-bar-icon'
        },{
            title: 'Social Buttons',
            link: '/ui/social-buttons',
            highlight: 'true'
        },{
            title: 'Intro JS',
            link: '/ui/intro-js',
            highlight: 'true'
        }]
    },{
        title: 'Form Stuff',
        icon: 'fa fa-file-o',
        link: '',
        label: 'NEW',
        caret: true,
        submenu: [{
            title: 'Form Elements',
            link: '/form/elements'
        },{
            title: 'Form Plugins',
            link: '/form/plugins'
        },{
            title: 'Form Slider + Switcher',
            link: '/form/slider-switcher'
        },{
            title: 'Form Validation',
            link: '/form/validation'
        },{
            title: 'WYSIWYG',
            link: '/form/wysiwyg'
        },{
            title: 'Summernote',
            link: '/form/summernote',
            highlight: 'true'
        }]
    },{
        title: 'Tables',
        icon: 'fa fa-th',
        link: '',
        caret: true,
        submenu: [{
            title: 'Basic Tables',
            link: '/table/basic'
        },{
            title: 'Managed Tables',
            link: '',
            caret: true,
            submenu: [{
                title: 'Default',
                link: '/table/manage/default'
            },{
                title: 'Autofill',
                link: '/table/manage/autofill'
            },{
                title: 'Buttons',
                link: '/table/manage/buttons'
            },{
                title: 'ColReorder',
                link: '/table/manage/colreorder'
            },{
                title: 'Fixed Column',
                link: '/table/manage/fixed-columns'
            },{
                title: 'Fixed Header',
                link: '/table/manage/fixed-header'
            },{
                title: 'KeyTable',
                link: '/table/manage/keytable'
            },{
                title: 'Responsive',
                link: '/table/manage/responsive'
            },{
                title: 'RowReorder',
                link: '/table/manage/rowreorder'
            },{
                title: 'Scroller',
                link: '/table/manage/scroller'
            },{
                title: 'Select',
                link: '/table/manage/select'
            },{
                title: 'Extension Combination',
                link: '/table/manage/combine'
            }]
        }]
    },{
        title: 'Front End',
        icon: 'fa fa-star',
        link: '',
        caret: true,
        submenu: [{
            title: 'One Page Parallax',
            link: '/../../frontend/one-page-parallax/template_content_html/index.html',
            external: true
        },{
            title: 'Blog',
            link: '/../../frontend/blog/template_content_html/index.html',
            external: true
        },{
            title: 'Forum',
            link: '/../../frontend/forum/template_content_html/index.html',
            external: true
        },{
            title: 'E-Commerce',
            link: '/../../frontend/e-commerce/template_content_html/index.html',
            external: true
        }]
    },{
        title: 'Email Template',
        icon: 'fa fa-envelope',
        link: '',
        caret: true,
        submenu: [{
            title: 'System Template',
            link: '/app/email_system.html',
            external: true
        },{
            title: 'Newsletter Template',
            link: '/app/email_newsletter.html',
            external: true
        }]
    },{
        title: 'Chart',
        icon: 'fa fa-area-chart',
        link: '',
        caret: true,
        submenu: [{
            title: 'Flot Chart',
            link: '/chart/flot'
        },{
            title: 'Morris Chart',
            link: '/chart/morris'
        },{
            title: 'Chart JS',
            link: '/chart/js'
        },{
            title: 'd3 Chart',
            link: '/chart/d3'
        }]
    },{
        title: 'Calendar',
        icon: 'fa fa-calendar',
        link: '/calendar'
    },{
        title: 'Map',
        icon: 'fa fa-map-marker',
        link: '',
        caret: true,
        submenu: [{
            title: 'Vector Map',
            link: '/map/vector'
        },{
            title: 'Google Map',
            link: '/map/google'
        }]
    },{
        title: 'Gallery',
        icon: 'fa fa-camera',
        link: '',
        caret: true,
        submenu: [{
            title: 'Gallery v1',
            link: '/gallery/v1'
        },{
            title: 'Gallery v2',
            link: '/gallery/v2'
        }]
    },{
        title: 'Page Options',
        icon: 'fa fa-cogs',
        link: '',
        caret: true,
        submenu: [{
            title: 'Blank Page',
            link: '/page/blank'
        },{
            title: 'Page with Footer',
            link: '/page/with-footer'
        },{
            title: 'Page without Sidebar',
            link: '/page/without-sidebar'
        },{
            title: 'Page with Right Sidebar',
            link: '/page/with-right-sidebar'
        },{
            title: 'Page with Minified Sidebar',
            link: '/page/with-minified-sidebar'
        },{
            title: 'Page with Two Sidebar',
            link: '/page/with-two-sidebar'
        },{
            title: 'Full Height Content',
            link: '/page/full-height-content'
        },{
            title: 'Page with Wide Sidebar',
            link: '/page/with-wide-sidebar'
        },{
            title: 'Page with Light Sidebar',
            link: '/page/with-light-sidebar'
        },{
            title: 'Page with Mega Menu',
            link: '/page/with-mega-menu'
        },{
            title: 'Page with Top Menu',
            link: '/page/with-top-menu'
        },{
            title: 'Page with Boxed Layout',
            link: '/page/with-boxed-layout'
        },{
            title: 'Page with Mixed Menu',
            link: '/page/with-mixed-menu'
        },{
            title: 'Boxed Layout with Mixed Menu',
            link: '/page/boxed-layout-with-mixed-menu'
        },{
            title: 'Page with Transparent Sidebar',
            link: '/page/with-transparent-sidebar'
        }]
    },{
        title: 'Extra',
        icon: 'fa fa-gift',
        link: '',
        caret: true,
        submenu: [{
            title: 'Timeline',
            link: '/extra/timeline'
        },{
            title: 'Coming Soon Page',
            link: '/extra/coming-soon'
        },{
            title: 'Search Results',
            link: '/extra/search'
        },{
            title: 'Invoice',
            link: '/extra/invoice'
        },{
            title: '404 Error Page',
            link: '/extra/error'
        },{
            title: 'Profile Page',
            link: '/extra/profile'
        }]
    },{
        title: 'Login & Register',
        icon: 'fa fa-key',
        link: '',
        caret: true,
        submenu: [{
            title: 'Login',
            link: '/user/login'
        },{
            title: 'Login v2',
            link: '/user/login-v2'
        },{
            title: 'Login v3',
            link: '/user/login-v3'
        },{
            title: 'Register v3',
            link: '/user/register-v3'
        }]
    },{
        title: 'Version',
        icon: 'fa fa-cubes',
        link: '',
        caret: true,
        label: 'NEW',
        submenu: [{
            title: 'HTML',
            link: '/../admin/template_content_html/index.html',
            external: true
        },{
            title: 'AJAX',
            link: '/../admin/template_content_ajax/index.html',
            external: true
        },{
            title: 'ANGULAR JS',
            link: '/../admin/template_content_angularjs/index.html',
            external: true
        },{
            title: 'ANGULAR JS 2',
            link: '',
            highlight: true
        },{
            title: 'MATERIAL DESIGN',
            link: '/../admin/template_content_material_design/index.html',
            external: true
        }]
    },{
        title: 'Helper',
        icon: 'fa fa-medkit',
        link: '',
        caret: true,
        submenu: [{
            title: 'Predefined CSS Classes',
            link: '/helper/css'
        }]
    },{
        title: 'Menu Level',
        icon: 'fa fa-align-left',
        link: '',
        caret: true,
        submenu: [{
            title: 'Menu 1.1',
            link: '',
            caret: true,
            submenu: [{
                title: 'Menu 2.1',
                link: '',
                caret: true,
                submenu: [{
                    title: 'Menu 3.1',
                    link: ''
                },{
                    title: 'Menu 3.2',
                    link: ''
                },{
                    title: 'Menu 3.3',
                    link: ''
                }]
            },{
                title: 'Menu 2.2',
                link: ''
            },{
                title: 'Menu 2.3',
                link: ''
            }]
        },{
            title: 'Menu 1.2',
            link: ''
        },{
            title: 'Menu 1.3',
            link: ''
        }]
    }];
}