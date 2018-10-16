import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {

    usuario: Usuario;
    imagenSubir: File;
    imagenTemp: string;

    constructor(public _us: UsuarioService) {
        this.usuario = _us.usuario;
    }

    ngOnInit() {
    }

    guardar(usuario: Usuario) {
        this.usuario.nombre = usuario.nombre;
        if (!this.usuario.google) {
            this.usuario.email = usuario.email;
        }

        this._us.actualizarUsuario(this.usuario)
            .subscribe(resp => {
                // console.log(resp);

            });

    }

    seleccionarImagen(archivo: File) {
        this.imagenSubir = null;

        if (!archivo) {
            return;
        }

        if (archivo.type.indexOf('image') < 0) {
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            return;
        }

        this.imagenSubir = archivo;
        const reader = new FileReader();
        const urlImagenTemp = reader.readAsDataURL(archivo);

        reader.onloadend = () => this.imagenTemp = reader.result.toString();
    }

    cambiarImagen() {
        this._us.cambiarImagen(this.imagenSubir, this.usuario._id);

    }

}
