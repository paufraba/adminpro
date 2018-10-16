import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SettingsService
    , SidebarService
    , SharedService
    , UsuarioService
    , LoginGuardGuard
    , SubirArchivoService
} from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [],
    providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        LoginGuardGuard,
        SubirArchivoService
    ]
})
export class ServiceModule { }
