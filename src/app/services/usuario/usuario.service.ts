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
    menu = [];

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
            this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.usuario = null;
            this.menu = [];
        }
    }
    guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));

        this.usuario = usuario;
        this.token = token;
        this.menu = menu;
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
                if (usuario._id === this.usuario._id) {
                    this.guardarStorage(resp.usuario._id, this.token, resp.usuario, resp.menu);
                }

                swal('Usuario actualizado', usuario.nombre, 'success');

                return true;
            })
        );
    }

    loginGoogle(token: string) {
        const url = URL_API + '/login/google';

        return this.http.post(url, { token }).pipe(
            map((resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

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
                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

                // console.log(resp);

                return true;
            })
        );
    }

    logOut() {
        this.usuario = null;
        this.token = '';
        this.menu = [];

        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('menu');

        this.router.navigate(['/login']);
    }

    cambiarImagen(imagen: File, id: string) {
        this._sa.subirArchivo(imagen, 'usuarios', id)
            .then((resp: any) => {
                // console.log(resp);
                this.usuario.img = resp.usuario.img;
                swal('Imagen actualizada', this.usuario.nombre, 'success');
                this.guardarStorage(id, this.token, this.usuario, this.menu);
            })
            .catch(resp => {
                console.error(resp);

            });
    }

    cargarUsuarios(desde: number = 0) {
        const url = URL_API + '/usuario?desde=' + desde;

        return this.http.get(url);
    }

    buscarUsuario(texto: string) {
        const url = URL_API + '/busqueda/coleccion/usuarios/' + texto;

        return this.http.get(url).pipe(
            map((resp: any) => resp.usuarios)
        );
    }

    borrarUsuario(id: string) {
        const url = URL_API + `/usuario/${id}?token=${this.token}`;
        return this.http.delete(url).pipe(
            map(resp => {
                swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', {
                    icon: 'success',
                });

                return true;
            })
        );
    }
}
