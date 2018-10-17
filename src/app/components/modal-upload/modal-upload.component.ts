import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
    styles: []
})
export class ModalUploadComponent implements OnInit {
    imagenSubir: File;
    imagenTemp: string;

    constructor(public _sa: SubirArchivoService,
        public _mu: ModalUploadService) {
        // console.log('Modal listo');
    }

    ngOnInit() {
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

    subirImagen() {
        // console.log('subirImagen');
        this._sa.subirArchivo(this.imagenSubir, this._mu.tipo, this._mu.id)
            .then(resp => {
                // console.log(resp);
                this._mu.notificacion.emit(resp);
                this.ocultarModal();
            })
            .catch(err => {
                console.error('Error en la carga', err);
            });
    }

    ocultarModal() {
        this.imagenTemp = null;
        this.imagenSubir = null;
        (<HTMLInputElement>document.getElementById('imagen')).value = '';
        this._mu.ocultarModal();
    }
}
