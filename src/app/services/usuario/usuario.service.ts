import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuario: Usuario;
    token: string;

    constructor(public http: HttpClient,
        public router: Router) {
        // console.log('Servicio de usuario listo');
        this.cargarStorage();
    }

    estaLogueado() {
        return (this.token.length > 1);
    }

    cargarStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        } else {
            this.token = '';
            this.usuario = null;
        }
    }
    guardarStorage(id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
    }

    crearUsuario(usuario: Usuario) {
        const url = URL_API + '/usuario';

        return this.http.post(url, usuario)
            .pipe(
                map((resp: any) => {

                    swal('Usuario creado', usuario.email, 'success');

                    return resp.usuario;
                })
            )
            ;
    }

    loginGoogle(token: string) {
        const url = URL_API + '/login/google';

        return this.http.post(url, { token }).pipe(
            map((resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario);

                return true;
            })
        );
    }

    login(usuario: Usuario, recordar: boolean) {

        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }

        const url = URL_API + '/login';

        return this.http.post(url, usuario).pipe(
            map((resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario);

                return true;
            })
        );
    }

    logOut() {
        this.usuario = null;
        this.token = '';

        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        this.router.navigate(['/login']);
    }
}
