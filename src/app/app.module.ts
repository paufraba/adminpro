import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { APP_ROUTES } from './app.routes';

import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './services/service.module';
import { MedicoComponent } from './pages/medicos/medico.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        MedicoComponent
    ],
    imports: [
        BrowserModule,
        APP_ROUTES,
        PagesModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
