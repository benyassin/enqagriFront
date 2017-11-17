import { NgModule, OnInit }         from '@angular/core';
import { BrowserModule, Title }     from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { BlocService } from './services/bloc.service';
import { FormService } from './services/form.service';
import { PerimetreService } from './services/perimetre.service';
import { ProjetService } from './services/projet.service';
import { CollecteService } from './services/collecte.service';
import { ReportingService } from './services/reporting.service'

import {MessagesModule} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { Ng2Permission } from 'angular2-permission'
import {TreeModule,TreeNode,TreeDragDropService } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormioModule } from 'angular-formio';
import { MomentModule } from 'angular2-moment';
import { Ng2SmartTableModule } from 'ng2-smart-table';





import { HttpClient } from './services/Http-client'

import { AuthGuard } from './guard/auth.guard';

// Main Component
import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header/header.component';
import { SidebarComponent }         from './sidebar/sidebar.component';
import { SidebarTwoComponent }      from './sidebar-two/sidebar-two.component';
import { ContentComponent }         from './content/content.component';
import { FooterComponent }          from './footer/footer.component';
import { TopMenuComponent }         from './top-menu/top-menu.component';
import { MegaMenuComponent }        from './header/mega-menu/mega-menu.component';
import { ThemePanelComponent }      from './theme-panel/theme-panel.component';

// Dashboard
import { DashboardV1Page }          from './pages/dashboard/v1/dashboard-v1';
import { DashboardV2Page }          from './pages/dashboard/v2/dashboard-v2';
import { LoginPage }                from './pages/user/login/login';

//Parametrage
import { DashboardPage }            from './pages/Parametrage/Dashboard/dashboard';
import { FormulairePage }                 from './pages/Parametrage/Formulaire/formulaire';
import { BlocPage }                       from './pages/Parametrage/Bloc/bloc';
import { FormPluginsPage }          from './pages/form-stuff/form-plugins/form-plugins';
import { AffectationPage }          from './pages/Parametrage/affectation/affectation';
import { ProjetPage }               from './pages/Parametrage/Projet/projet';
import { testProjetPage }               from './pages/Parametrage/Projet/inspect';


//Validtion
import { RnaValidationPage }           from './pages/validation/rna';
import { ValidationPage } from './pages/validation/validation';
import { GeolessPage } from './pages/validation/geoless';

import { CollectePage }           from './pages/collecte/collecte';
import { ReportingPage }          from './pages/reporting/reporting';
import { ReportingRegionPage }          from './pages/reporting/reportingRegion';
import { ReportingAgentPage }          from './pages/reporting/reportingAgent';


import { ExtraProfilePage }         from './pages/extra/extra-profile/extra-profile';
import { UtilisateurPage }          from './pages/utilisateur/dashboard'
import { CreationUtilisateurPage }           from './pages/utilisateur/utilisateur'
import { ProfilePage }  from './pages/utilisateur/profile';
import { LowerCaseTextDirective } from './lower-case-text.directive';
import { TimesPipe } from './safe.pipe'
import { Select2Module } from 'ng2-select2'
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ValuesPipe } from './values.pipe';



import { ChartsModule } from 'ng2-charts/ng2-charts';

// Chart
import { ChartFlotPage }            from './pages/chart/chart-flot/chart-flot';
import { ChartJsPage }              from './pages/chart/chart-js/chart-js';
import { ChartMorrisPage }          from './pages/chart/chart-morris/chart-morris';
import { ChartD3Page }              from './pages/chart/chart-d3/chart-d3';
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
import { FormElementsPage }         from './pages/form-stuff/form-elements/form-elements';

import { FormSliderSwitcherPage }   from './pages/form-stuff/form-slider-switcher/form-slider-switcher';
import { FormSummernotePage }       from './pages/form-stuff/form-summernote/form-summernote';
import { FormWysiwygPage }          from './pages/form-stuff/form-wysiwyg/form-wysiwyg';
import { FormValidationPage }       from './pages/form-stuff/form-validation/form-validation';

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

@NgModule({
    imports:        [Ng2SmartTableModule,ChartsModule,MomentModule,FormioModule,AngularMultiSelectModule,Select2Module,Ng2Permission,MessagesModule,TreeModule,PickListModule,ConfirmDialogModule,HttpModule,SortablejsModule, BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule ],
    declarations:   [ 
        AppComponent,
        HeaderComponent, 
        SidebarComponent, 
        SidebarTwoComponent,
        ContentComponent,
        ThemePanelComponent,
        TopMenuComponent,
        MegaMenuComponent,
        FooterComponent,
        DashboardV1Page,
        DashboardV2Page,
        FormulairePage,
        BlocPage,
        FormPluginsPage,
        LoginPage,
        ExtraProfilePage,
        UtilisateurPage,
        ProfilePage,
        DashboardPage,
        LowerCaseTextDirective,
        TimesPipe,
        AffectationPage,
        ProjetPage,
        CreationUtilisateurPage,
        testProjetPage,
        ValuesPipe,
        RnaValidationPage,
        ValidationPage,
        CollectePage,
        GeolessPage,
        ChartFlotPage,
        ChartJsPage,
        ChartMorrisPage,
        ChartD3Page,
        ReportingPage,
        ReportingRegionPage,
        ReportingAgentPage
       /*EmailInboxV1Page,
        EmailInboxV2Page,
        EmailComposePage,
        EmailDetailPage,
        UIGeneralPage,
        UITypographyPage,
        UITabsAccordionsPage,
        UIUnlimitedNavTabsPage,
        UIModalNotificationPage,
        UIWidgetBoxesPage,
        UIMediaObjectPage,
        UIButtonsPage,
        UIIconsPage,
        UISimpleLineIconsPage,
        UIIoniconsPage,
        UITreeViewPage,
        UILanguageBarIconPage,
        UISocialButtonsPage,
        UIIntroJsPage,
        Bootstrap4Page,
        FormElementsPage,

        FormSliderSwitcherPage,
        FormSummernotePage,
        FormWysiwygPage,
        FormValidationPage,
        TableBasicPage,
        TableManageDefaultPage,
        TableManageAutofillPage,
        TableManageButtonsPage,
        TableManageColReorderPage,
        TableManageCombinePage,
        TableManageFixedColumnsPage,
        TableManageFixedHeaderPage,
        TableManageKeyTablePage,
        TableManageResponsivePage,
        TableManageRowReorderPage,
        TableManageScrollerPage,
        TableManageSelectPage,
        ChartFlotPage,
        ChartJsPage,
        ChartMorrisPage,
        ChartD3Page,
        CalendarPage,
        MapVectorPage,
        MapGooglePage,
        GalleryV1Page,
        GalleryV2Page,
        BlankPage,
        SidebarMinifiedPage,
        FullHeightContentPage,
        WideSidebarPage,
        LightSidebarPage,
        TransparentSidebarPage,
        RightSidebarPage,
        FooterPage,
        TopMenuPage,
        WithoutSidebarPage,
        TwoSidebarPage,
        BoxedLayoutPage,
        MixedMenuPage,
        MegaMenuPage,
        BoxedLayoutMixedMenuPage,
        HelperCssPage,
        ExtraTimelinePage,
        ExtraComingSoonPage,
        ExtraSearchResultsPage,
        ExtraInvoicePage,
        ExtraErrorPage,
        LoginV2Page,
        LoginV3Page,
        RegisterV3Page*/
    ],
    providers: [ Title,ReportingService,CollecteService,ProjetService, AuthenticationService,ConfirmationService,TreeDragDropService , FormService, UserService,BlocService,PerimetreService, HttpClient, AuthGuard],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
    constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
        router.events.subscribe((e) => {
            // change page title when url change
            if (e instanceof NavigationEnd) {
                var title = 'Rna Collecte | ' + this.route.snapshot.firstChild.data['title'];
                this.titleService.setTitle(title);
                
                window.dispatchEvent(new CustomEvent('page-reload'));
            }
        });
    }
}