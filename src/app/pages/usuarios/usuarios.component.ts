import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: []
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    desde = 0;
    total = 0;
    cargando = true;

    constructor(public _us: UsuarioService,
        public _mus: ModalUploadService) { }

    ngOnInit() {
        this.cargarUsuarios();
        this._mus.notificacion.subscribe(resp => {
            this.cargarUsuarios();
        });
    }

    cargarUsuarios() {
        this.cargando = true;
        this._us.cargarUsuarios(this.desde)
            .subscribe((resp: any) => {
                // console.log(resp);
                this.total = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
            });

    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;
        // console.log(desde);

        if (desde >= this.total) {
            return;
        }

        if (desde < 0) {
            return;
        }

        this.desde = desde;
        this.cargarUsuarios();
    }

    buscarUsuario(texto: string) {
        if (texto.length <= 0) {
            this.cargarUsuarios();
            return;
        }

        this.cargando = true;
        this._us.buscarUsuario(texto).subscribe((usuarios: Usuario[]) => {
            // console.log(usuarios);
            this.usuarios = usuarios;
            this.cargando = false;
        });
    }

    borrarUsuario(usuario: Usuario) {
        swal({
            title: '¿Quiere borrar el usuario?',
            text: 'Una vez "' + usuario.nombre + '" esté borrado, no se podrá recuperar!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then((borrar) => {
                // console.log(borrar);

                if (borrar) {
                    this._us.borrarUsuario(usuario._id)
                        .subscribe(resp => {
                            // console.log(resp);
                            this.cargarUsuarios();
                        });
                }
            });

    }

    guardarUsuario(usuario: Usuario) {
        this._us.actualizarUsuario(usuario)
            .subscribe();
    }

    mostrarModal(id: string) {
        this._mus.mostrarModal('usuarios', id);
    }

}
