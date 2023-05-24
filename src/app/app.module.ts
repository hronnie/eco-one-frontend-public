import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Import routing module
import {AppRoutingModule} from './app-routing.module';

// Import app component
import {AppComponent} from './app.component';

// Import containers
import {
    DefaultAsideComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    DefaultLayoutComponent
} from './containers';

import {
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    FooterModule,
    GridModule,
    HeaderModule,
    NavModule,
    SidebarModule
} from '@coreui/angular-pro';

import {IconModule, IconSetService} from '@coreui/icons-angular';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

const APP_CONTAINERS = [
    DefaultAsideComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    DefaultLayoutComponent
];

@NgModule({
    declarations: [AppComponent, ...APP_CONTAINERS],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BreadcrumbModule,
        FooterModule,
        GridModule,
        HeaderModule,
        SidebarModule,
        IconModule,
        NavModule,
        ButtonModule,
        SidebarModule,
        BadgeModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        IconSetService,
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
