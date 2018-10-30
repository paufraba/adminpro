import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    HospitalService,
    MedicoService,
    AdminGuard,
    TokenGuard
} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


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
        SubirArchivoService,
        ModalUploadService,
        HospitalService,
        MedicoService,
        AdminGuard,
        TokenGuard
    ]
})
export class ServiceModule { }
