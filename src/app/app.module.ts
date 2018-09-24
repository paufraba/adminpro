import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafico1Component } from './pages/grafico1/grafico1.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { APP_ROUTES } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NopagefoundComponent,
        DashboardComponent,
        ProgressComponent,
        Grafico1Component,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        PagesComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        APP_ROUTES
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
