import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    ajustes: Ajustes = {
        URL: 'assets/css/colors/default.css',
        tema: 'default'
    };

    constructor(@Inject(DOCUMENT) private _doc) {
        this.cargarAjustes();
    }

    guardarAjustes() {
        localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    }

    cargarAjustes() {
        if (localStorage.getItem('ajustes')) {
            this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
            this.aplicarTema(this.ajustes.tema);
        } else {
            // Si no hay nada guardado aplicar el tema por defecto
            this.aplicarTema(this.ajustes.tema);
        }
    }

    aplicarTema(color: string) {
        const url = `assets/css/colors/${color}.css`;
        this._doc.getElementById('tema').setAttribute('href', url);

        this.ajustes.tema = color;
        this.ajustes.URL = url;

        this.guardarAjustes();
    }
}

interface Ajustes {
    URL: string;
    tema: string;
}
