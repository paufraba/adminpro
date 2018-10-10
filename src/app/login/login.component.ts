import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { GOOGLE_CLIENT_ID } from '../config/config';

declare function init_plugins();
declare const gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    recuerdame = false;
    email: string;
    auth2: any;

    constructor(private router: Router,
        public _us: UsuarioService
    ) { }

    ngOnInit() {
        init_plugins();
        this.googleInit();

        this.email = localStorage.getItem('email') || '';
        this.recuerdame = this.email.length > 1;
    }

    googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: GOOGLE_CLIENT_ID,
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });

            this.auth2.then(onInit => {
                this.attachSignIn(document.getElementById('btnGoogle'));
            }, err => {
                console.log('Error al inicializar al API de Google: ', err.details);
            });
        });
    }

    attachSignIn(elemento: HTMLElement) {
        this.auth2.attachClickHandler(elemento, {}, googleUser => {
            // const profile = googleUser.getBasicProfile();
            const token = googleUser.getAuthResponse().id_token;

            console.log('Login Google...');

            this._us.loginGoogle(token)
                .subscribe(
                    resp => {
                        // console.log(resp);
                        this.router.navigate(['/dashboard']);
                    },
                    err => {
                        console.error(err.error.errors);
                    });
        });
    }

    acceder(form: NgForm) {

        if (form.invalid) {
            return;
        }

        const usuario = new Usuario(null, form.value.email, form.value.password);

        this._us.login(usuario, form.value.recuerdame)
            .subscribe(data => {
                // console.log(data);
                this.router.navigate(['/dashboard']);
            });

        // console.log('Válido', form.valid);
        // console.log(form.value);
    }
}
