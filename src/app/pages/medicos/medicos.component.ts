import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
    selector: 'app-medicos',
    templateUrl: './medicos.component.html',
    styles: []
})
export class MedicosComponent implements OnInit {
    cargando = true;
    desde = 0;
    medicos: Medico[] = [];

    constructor(public _ms: MedicoService) { }

    ngOnInit() {
        this.cargarMedicos();
    }

    cargarMedicos() {
        this.cargando = true;
        this._ms.cargarMedicos(this.desde)
            .subscribe((resp: any) => {

                this.medicos = resp;
                this.cargando = false;
            });

    }

    buscarMedico(texto: string) {
        if (texto.length <= 0) {
            this.cargarMedicos();
            return;
        }

        this.cargando = true;
        this._ms.buscarMedico(texto).subscribe((medicos: Medico[]) => {
            // console.log(usuarios);
            this.medicos = medicos;
            this.cargando = false;
        });
    }

    borrarMedico(medico: Medico) {
        swal({
            title: '¿Quiere borrar el médico?',
            text: 'Una vez "' + medico.nombre + '" esté borrado, no se podrá recuperar!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then((borrar) => {
                // console.log(borrar);

                if (borrar) {
                    this._ms.borrarMedico(medico._id)
                        .subscribe(resp => {
                            // console.log(resp);
                            this.cargarMedicos();
                        });
                }
            });
    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;
        // console.log(desde);

        if (desde >= this._ms.totalMedicos) {
            return;
        }

        if (desde < 0) {
            return;
        }

        this.desde = desde;
        this.cargarMedicos();
    }

}
