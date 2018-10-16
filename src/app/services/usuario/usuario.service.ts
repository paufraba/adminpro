import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuario: Usuario;
    token: string;

    constructor(public http: HttpClient,
        public router: Router,
        public _sa: SubirArchivoService) {
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

    actualizarUsuario(usuario: Usuario) {
        const url = URL_API + '/usuario/' + usuario._id + '?token=' + this.token;

        return this.http.put(url, usuario).pipe(
            map((resp: any) => {
                this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
                swal('Usuario actualizado', usuario.nombre, 'success');

                return true;
            })
        );
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

    cambiarImagen(imagen: File, id: string) {
        this._sa.subirArchivo(imagen, 'usuarios', id)
            .then((resp: any) => {
                // console.log(resp);
                this.usuario.img = resp.usuario.img;
                swal('Imagen actualizada', this.usuario.nombre, 'success');
                this.guardarStorage(id, this.token, this.usuario);
            })
            .catch(resp => {
                console.error(resp);

            });
    }
}
