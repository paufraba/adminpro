import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_API } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styles: []
})
export class BusquedaComponent implements OnInit {
    texto: string;
    usuarios: Usuario[] = [];
    medicos: Medico[] = [];
    hospitales: Hospital[] = [];

    constructor(public ruta: ActivatedRoute,
        public http: HttpClient) {
        ruta.params.subscribe(params => {
            this.texto = params['texto'];
            // console.log(this.texto);
            this.buscar(this.texto);
        });
    }

    ngOnInit() {
    }

    buscar(texto: string) {
        const url = URL_API + `/busqueda/todo/${texto}`;
        this.http.get(url).subscribe((resp: any) => {
            console.log(resp);

            this.hospitales = resp.hospitales;
            this.medicos = resp.medicos;
            this.usuarios = resp.usuarios;
        });
    }

}
