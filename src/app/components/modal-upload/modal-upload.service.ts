import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalUploadService {

    public tipo: string;
    public id: string;
    public oculto = 'oculto';
    public notificacion = new EventEmitter<any>();

    constructor() {
        // console.log('ModalUploadService');
    }

    ocultarModal() {
        this.oculto = 'oculto';
        this.tipo = null;
        this.id = null;
    }

    mostrarModal(tipo: string, id: string) {
        this.oculto = '';
        this.tipo = tipo;
        this.id = id;
    }
}
