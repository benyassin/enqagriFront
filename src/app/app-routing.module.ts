import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router'; 

// Dashboard
import { DashboardV1Page }          from './pages/dashboard/v1/dashboard-v1';
import { DashboardV2Page }          from './pages/dashboard/v2/dashboard-v2';

//parametrage
import { DashboardPage }          from './pages/Parametrage/Dashboard/dashboard'
import { FormulairePage }         from './pages/Parametrage/Formulaire/formulaire';
import { ProjetPage }             from './pages/Parametrage/Projet/projet';
import { BlocPage }               from './pages/Parametrage/Bloc/bloc';
import { FormPluginsPage }          from './pages/form-stuff/form-plugins/form-plugins';

import { LoginPage }                from './pages/user/login/login';
import { AuthGuard }              from './guard/auth.guard'
import { UtilisateurPage }        from './pages/utilisateur/dashboard';
import { CreationUtilisateurPage } from './pages/utilisateur/utilisateur'
import { testProjetPage }               from './pages/Parametrage/Projet/inspect';
import { ProfilePage }              from './pages/utilisateur/profile';
import { ArchivedPage }             from './pages/Parametrage/Dashboard/archived';

import { ReportingPage }          from './pages/reporting/reporting'


// Chart
import { ChartFlotPage }            from './pages/chart/chart-flot/chart-flot';
import { ChartJsPage }              from './pages/chart/chart-js/chart-js';
import { ChartMorrisPage }          from './pages/chart/chart-morris/chart-morris';
import { ChartD3Page }              from './pages/chart/chart-d3/chart-d3';
//validation 

import { RnaValidationPage }        from './pages/validation/rna'
import { ValidationPage }           from './pages/validation/validation'
import { CollectePage }             from './pages/collecte/collecte';
import { GeolessPage }              from './pages/validation/geoless';
import { ImportPage }               from './pages/import/import';
import { PermissionGuard, IPermissionGuardModel } from 'angular2-permission';

/*
// Email
import { EmailInboxV1Page }         from './pages/email/inbox/v1/email-inbox-v1';
import { EmailInboxV2Page }         from './pages/email/inbox/v2/email-inbox-v2';
import { EmailComposePage }         from './pages/email/compose/email-compose';
import { EmailDetailPage }          from './pages/email/detail/email-detail';

// UI Element
import { UIGeneralPage }            from './pages/ui-elements/general/general';
import { UITypographyPage }         from './pages/ui-elements/typography/typography';
import { UITabsAccordionsPage }     from './pages/ui-elements/tabs-accordions/tabs-accordions';
import { UIUnlimitedNavTabsPage }   from './pages/ui-elements/unlimited-nav-tabs/unlimited-nav-tabs';
import { UIModalNotificationPage }  from './pages/ui-elements/modal-notification/modal-notification';
import { UIWidgetBoxesPage }        from './pages/ui-elements/widget-boxes/widget-boxes';
import { UIMediaObjectPage }        from './pages/ui-elements/media-object/media-object';
import { UIButtonsPage }            from './pages/ui-elements/buttons/buttons';
import { UIIconsPage }              from './pages/ui-elements/icons/icons';
import { UISimpleLineIconsPage }    from './pages/ui-elements/simple-line-icons/simple-line-icons';
import { UIIoniconsPage }           from './pages/ui-elements/ionicons/ionicons';
import { UITreeViewPage }           from './pages/ui-elements/tree-view/tree-view';
import { UILanguageBarIconPage }    from './pages/ui-elements/language-bar-icon/language-bar-icon';
import { UISocialButtonsPage }      from './pages/ui-elements/social-buttons/social-buttons';
import { UIIntroJsPage }            from './pages/ui-elements/intro-js/intro-js';

// Bootstrap 4
import { Bootstrap4Page }             from './pages/bootstrap-4/bootstrap-4';

// Form Stuff

import { FormSliderSwitcherPage }   from './pages/form-stuff/form-slider-switcher/form-slider-switcher';
import { FormSummernotePage }       from './pages/form-stuff/form-summernote/form-summernote';
import { FormWysiwygPage }          from './pages/form-stuff/form-wysiwyg/form-wysiwyg';
import { FormValidationPage }          from './pages/form-stuff/form-validation/form-validation';

// Table
import { TableBasicPage }                   from './pages/tables/table-basic/table-basic';
import { TableManageDefaultPage }           from './pages/tables/table-manage-default/table-manage-default';
import { TableManageAutofillPage }          from './pages/tables/table-manage-autofill/table-manage-autofill';
import { TableManageButtonsPage }           from './pages/tables/table-manage-buttons/table-manage-buttons';
import { TableManageColReorderPage }        from './pages/tables/table-manage-colreorder/table-manage-colreorder';
import { TableManageCombinePage }           from './pages/tables/table-manage-combine/table-manage-combine';
import { TableManageFixedColumnsPage }      from './pages/tables/table-manage-fixed-columns/table-manage-fixed-columns';
import { TableManageFixedHeaderPage }       from './pages/tables/table-manage-fixed-header/table-manage-fixed-header';
import { TableManageKeyTablePage }          from './pages/tables/table-manage-keytable/table-manage-keytable';
import { TableManageResponsivePage }        from './pages/tables/table-manage-responsive/table-manage-responsive';
import { TableManageRowReorderPage }        from './pages/tables/table-manage-rowreorder/table-manage-rowreorder';
import { TableManageScrollerPage }          from './pages/tables/table-manage-scroller/table-manage-scroller';
import { TableManageSelectPage }            from './pages/tables/table-manage-select/table-manage-select';

// Chart
import { ChartFlotPage }            from './pages/chart/chart-flot/chart-flot';
import { ChartJsPage }              from './pages/chart/chart-js/chart-js';
import { ChartMorrisPage }          from './pages/chart/chart-morris/chart-morris';
import { ChartD3Page }              from './pages/chart/chart-d3/chart-d3';

// Calendar
import { CalendarPage }             from './pages/calendar/calendar';

// Map
import { MapVectorPage }            from './pages/map/map-vector/map-vector';
import { MapGooglePage }            from './pages/map/map-google/map-google';

// Gallery
import { GalleryV1Page }            from './pages/gallery/gallery-v1/gallery-v1';
import { GalleryV2Page }            from './pages/gallery/gallery-v2/gallery-v2';

// Extra Pages
import { ExtraTimelinePage }        from './pages/extra/extra-timeline/extra-timeline';
import { ExtraComingSoonPage }      from './pages/extra/extra-coming-soon/extra-coming-soon';
import { ExtraSearchResultsPage }   from './pages/extra/extra-search-results/extra-search-results';
import { ExtraInvoicePage }         from './pages/extra/extra-invoice/extra-invoice';
import { ExtraErrorPage }           from './pages/extra/extra-error/extra-error';

// Page Options
import { BlankPage }                from './pages/page-options/page-blank/page-blank';
import { FullHeightContentPage }    from './pages/page-options/full-height-content/full-height-content';
import { SidebarMinifiedPage }      from './pages/page-options/page-with-minified-sidebar/page-with-minified-sidebar';
import { WideSidebarPage }          from './pages/page-options/page-with-wide-sidebar/page-with-wide-sidebar';
import { LightSidebarPage }         from './pages/page-options/page-with-light-sidebar/page-with-light-sidebar';
import { RightSidebarPage }         from './pages/page-options/page-with-right-sidebar/page-with-right-sidebar';
import { TwoSidebarPage }           from './pages/page-options/page-with-two-sidebar/page-with-two-sidebar';
import { WithoutSidebarPage }       from './pages/page-options/page-without-sidebar/page-without-sidebar';
import { TopMenuPage }              from './pages/page-options/page-with-top-menu/page-with-top-menu';
import { TransparentSidebarPage }   from './pages/page-options/page-with-transparent-sidebar/page-with-transparent-sidebar';
import { FooterPage }               from './pages/page-options/page-with-footer/page-with-footer';
import { BoxedLayoutPage }          from './pages/page-options/page-with-boxed-layout/page-with-boxed-layout';
import { MixedMenuPage }            from './pages/page-options/page-with-mixed-menu/page-with-mixed-menu';
import { MegaMenuPage }             from './pages/page-options/page-with-mega-menu/page-with-mega-menu';
import { BoxedLayoutMixedMenuPage } from './pages/page-options/page-boxed-layout-with-mixed-menu/page-boxed-layout-with-mixed-menu';

// User Login / Register
import { LoginV2Page }              from './pages/user/login-v2/login-v2';
import { LoginV3Page }              from './pages/user/login-v3/login-v3';
import { RegisterV3Page }           from './pages/user/register-v3/register-v3';

// Helper
import { HelperCssPage }        from './pages/helper/helper-css/helper-css';*/

const routes: Routes = [
    { path: '', redirectTo: 'Parametrage/Parametrage', pathMatch: 'full',canActivate: [AuthGuard]},
    { path: 'dashboard/v1', component: DashboardV1Page, data: { title: 'Dashboard'},canActivate: [AuthGuard] },
    { path: 'dashboard/v2', component: DashboardV2Page, data: { title: 'Dashboard V2'},canActivate: [AuthGuard] },


    { path: 'user/login', component: LoginPage, data: { title: 'Login'} },
    
    { path: 'Parametrage/Enquete',component: ProjetPage, data: {title: 'Enquête'},canActivate:[AuthGuard]},
    { path: 'Parametrage/Archived',component: ArchivedPage, data: {title: 'Archived'},canActivate:[AuthGuard]},
    
    { path: 'Parametrage/Enquete/inspect', component: testProjetPage, data: { title: 'Inspect'},canActivate: [AuthGuard]},
    { path: 'Parametrage/Parametrage',component: DashboardPage, data:{title: 'Gestion des Enquêtes'},canActivate: [AuthGuard]},
    { path: 'Parametrage/Questionnaire', component: FormulairePage, data: { title: 'Questionnaire'},canActivate: [AuthGuard]},
    { path: 'Parametrage/Bloc', component: BlocPage, data: { title: 'Bloc'},canActivate: [AuthGuard]},
    { path: 'form/plugins', component: FormPluginsPage, data: { title: 'Form Plugins'},canActivate: [AuthGuard] },
    { path: 'utilisateur', component: UtilisateurPage, data: { title: 'Utilisateur',
            Permission: {
                Only: ['admin'],
                RedirectTo: 'dashboard/v1'
            } as IPermissionGuardModel},canActivate: [AuthGuard,PermissionGuard] },

    { path: 'utilisateur/profile', component: ProfilePage, data: {title: "ProfilePage",
            Permission: {
                Only: ['admin'],
                RedirectTo: 'dashboard/v1'
            } as IPermissionGuardModel},canActivate: [AuthGuard,PermissionGuard] },

    { path: 'utilisateur/creation',component: CreationUtilisateurPage, data: {title: "Creation Utilisateur",
            Permission: {
                Only: ['admin'],
                RedirectTo: 'dashboard/v1'
            } as IPermissionGuardModel},canActivate: [AuthGuard,PermissionGuard] },

    { path: 'collectes/rnacollecte', component: RnaValidationPage, data:{title: 'Rna Collecte'},canActivate:[AuthGuard]},
    { path: 'collectes/collecte', component: ValidationPage,data :{title: 'Collecte'},canActivate:[AuthGuard]},
    { path: 'collectes/geoless', component: GeolessPage, data:{title: 'Collecte Sans Geometrie'},canActivate:[AuthGuard]},
    
    { path: 'support', component: ImportPage, data:{title: 'Support Spatial'},canActivate:[AuthGuard]},

    { path: 'collectes', component: CollectePage, data:{title: 'Collectes'},canActivate:[AuthGuard]},
    { path: 'reporting', component: ReportingPage, data:{title: 'Reporting'},canActivate:[AuthGuard]},
    
    
    { path: 'chart/flot', component: ChartFlotPage, data: { title: 'Chart Flot'} },
    { path: 'chart/morris', component: ChartMorrisPage, data: { title: 'Chart Morris'} },
    { path: 'chart/js', component: ChartJsPage, data: { title: 'Chart JS'} },
    { path: 'chart/d3', component: ChartD3Page, data: { title: 'Chart D3'} },
    
    /*
    { path: 'email/inbox/v1', component: EmailInboxV1Page, data: { title: 'Email Inbox V1'} },
    { path: 'email/inbox/v2', component: EmailInboxV2Page, data: { title: 'Email Inbox V2'} },
    { path: 'email/compose', component: EmailComposePage, data: { title: 'Email Compose'} },
    { path: 'email/detail', component: EmailDetailPage, data: { title: 'Email Detail'} },
    { path: 'ui/general', component: UIGeneralPage, data: { title: 'UI General'} },
    { path: 'ui/typography', component: UITypographyPage, data: { title: 'UI Typography'} },
    { path: 'ui/tabs-accordions', component: UITabsAccordionsPage, data: { title: 'UI Tabs & Accordions'} },
    { path: 'ui/unlimited-nav-tabs', component: UIUnlimitedNavTabsPage, data: { title: 'UI Unlimited Nav Tabs'} },
    { path: 'ui/modal-notification', component: UIModalNotificationPage, data: { title: 'UI Modal & Notification'} },
    { path: 'ui/widget-boxes', component: UIWidgetBoxesPage, data: { title: 'UI Widget Boxes'} },
    { path: 'ui/media-object', component: UIMediaObjectPage, data: { title: 'UI Media Object'} },
    { path: 'ui/buttons', component: UIButtonsPage, data: { title: 'UI Buttons'} },
    { path: 'ui/icons', component: UIIconsPage, data: { title: 'UI Icons'} },
    { path: 'ui/simple-line-icons', component: UISimpleLineIconsPage, data: { title: 'UI SimpleLineIcons'} },
    { path: 'ui/ionicons', component: UIIoniconsPage, data: { title: 'UI Ionicons'} },
    { path: 'ui/tree-view', component: UITreeViewPage, data: { title: 'UI Tree View'} },
    { path: 'ui/language-bar-icon', component: UILanguageBarIconPage, data: { title: 'UI Language Bar Icon'} },
    { path: 'ui/social-buttons', component: UISocialButtonsPage, data: { title: 'UI Social Buttons'} },
    { path: 'ui/intro-js', component: UIIntroJsPage, data: { title: 'Intro JS'} },
    { path: 'bootstrap-4', component: Bootstrap4Page, data: { title: 'Bootstrap 4'} },
    { path: 'form/elements', component: FormElementsPage, data: { title: 'Form Elements'} },

    { path: 'form/slider-switcher', component: FormSliderSwitcherPage, data: { title: 'Form Slider Switcher'} },
    { path: 'form/summernote', component: FormSummernotePage, data: { title: 'Form Summernote'} },
    { path: 'form/wysiwyg', component: FormWysiwygPage, data: { title: 'Form WYSIWYG'} },
    { path: 'form/validation', component: FormValidationPage, data: { title: 'Form Validation'} },
    { path: 'table/basic', component: TableBasicPage, data: { title: 'Basic Tables'} },
    { path: 'table/manage/default', component: TableManageDefaultPage, data: { title: 'Managed Table Default'} },
    { path: 'table/manage/autofill', component: TableManageAutofillPage, data: { title: 'Managed Table Autofill'} },
    { path: 'table/manage/buttons', component: TableManageButtonsPage, data: { title: 'Managed Table Buttons'} },
    { path: 'table/manage/colreorder', component: TableManageColReorderPage, data: { title: 'Managed Table ColReorder'} },
    { path: 'table/manage/fixed-columns', component: TableManageFixedColumnsPage, data: { title: 'Managed Table Fixed Column'} },
    { path: 'table/manage/fixed-header', component: TableManageFixedHeaderPage, data: { title: 'Managed Table Fixed Header'} },
    { path: 'table/manage/keytable', component: TableManageKeyTablePage, data: { title: 'Managed Table KeyTable'} },
    { path: 'table/manage/responsive', component: TableManageResponsivePage, data: { title: 'Managed Table Responsive'} },
    { path: 'table/manage/rowreorder', component: TableManageRowReorderPage, data: { title: 'Managed Table RowReorder'} },
    { path: 'table/manage/scroller', component: TableManageScrollerPage, data: { title: 'Managed Table Scroller'} },
    { path: 'table/manage/select', component: TableManageSelectPage, data: { title: 'Managed Table Select'} },
    { path: 'table/manage/combine', component: TableManageCombinePage, data: { title: 'Managed Table Extension Combination'} },
    { path: 'chart/flot', component: ChartFlotPage, data: { title: 'Chart Flot'} },
    { path: 'chart/morris', component: ChartMorrisPage, data: { title: 'Chart Morris'} },
    { path: 'chart/js', component: ChartJsPage, data: { title: 'Chart JS'} },
    { path: 'chart/d3', component: ChartD3Page, data: { title: 'Chart D3'} },
    { path: 'calendar', component: CalendarPage, data: { title: 'Calendar'} },
    { path: 'map/vector', component: MapVectorPage, data: { title: 'Vector Map'} },
    { path: 'map/google', component: MapGooglePage, data: { title: 'Google Map'} },
    { path: 'gallery/v1', component: GalleryV1Page, data: { title: 'Gallery V1'} },
    { path: 'gallery/v2', component: GalleryV2Page, data: { title: 'Gallery V2'} },
    { path: 'extra/timeline', component: ExtraTimelinePage, data: { title: 'Timeline'} },
    { path: 'extra/coming-soon', component: ExtraComingSoonPage, data: { title: 'Coming Soon Page'} },
    { path: 'extra/search', component: ExtraSearchResultsPage, data: { title: 'Search Results Page'} },
    { path: 'extra/error', component: ExtraErrorPage, data: { title: 'Error Page'} },
    { path: 'extra/invoice', component: ExtraInvoicePage, data: { title: 'Invoice'} },
    { path: 'page/blank', component: BlankPage, data: { title: 'Blank Page'} },
    { path: 'page/with-minified-sidebar', component: SidebarMinifiedPage, data: { title: 'Page with Minified Sidebar'} },
    { path: 'page/full-height-content', component: FullHeightContentPage, data: { title: 'Full Height Content' } },
    { path: 'page/with-wide-sidebar', component: WideSidebarPage, data: { title: 'Page with Wide Sidebar' } },
    { path: 'page/with-footer', component: FooterPage, data: { title: 'Page with Footer' } },
    { path: 'page/with-light-sidebar', component: LightSidebarPage, data: { title: 'Page with Light Sidebar' } },
    { path: 'page/with-transparent-sidebar', component: TransparentSidebarPage, data: { title: 'Page with Transparent Sidebar' } },
    { path: 'page/with-right-sidebar', component: RightSidebarPage, data: { title: 'Page with Right Sidebar' } },
    { path: 'page/with-top-menu', component: TopMenuPage, data: { title: 'Page with Top Menu' } },
    { path: 'page/without-sidebar', component: WithoutSidebarPage, data: { title: 'Page without Sidebar' } },
    { path: 'page/with-two-sidebar', component: TwoSidebarPage, data: { title: 'Page with Two Sidebar' } },
    { path: 'page/with-boxed-layout', component: BoxedLayoutPage, data: { title: 'Page with Boxed Layout' } },
    { path: 'page/with-mixed-menu', component: MixedMenuPage, data: { title: 'Page with Mixed Menu' } },
    { path: 'page/with-mega-menu', component: MegaMenuPage, data: { title: 'Page with Mega Menu' } },
    { path: 'page/boxed-layout-with-mixed-menu', component: BoxedLayoutMixedMenuPage, data: { title: 'Page Boxed Layout with Mixed Menu' } },
    { path: 'user/login-v2', component: LoginV2Page, data: { title: 'Login V2 Page'} },
    { path: 'user/login-v3', component: LoginV3Page, data: { title: 'Login V3 Page'} },
    { path: 'user/register-v3', component: RegisterV3Page, data: { title: 'Register V3 Page'} },
    { path: 'helper/css', component: HelperCssPage, data: { title: 'Helper CSS'} } */
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}