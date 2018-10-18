import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
    selector: 'app-hospitales',
    templateUrl: './hospitales.component.html',
    styles: []
})
export class HospitalesComponent implements OnInit {
    cargando = true;
    desde = 0;
    total = 0;
    hospitales: Hospital[] = [];

    constructor(public _hs: HospitalService,
        public _mus: ModalUploadService) { }

    ngOnInit() {
        this.cargarHospitales();
        this._mus.notificacion.subscribe(() => {
            this.cargarHospitales();
        });
    }

    cargarHospitales() {
        this.cargando = true;
        this._hs.cargarHospitales(this.desde)
            .subscribe((resp: any) => {
                // console.log(resp);
                this.total = resp.total;
                this.hospitales = resp.hospitales;
                this.cargando = false;
            });

    }

    mostrarModal(id: string) {
        this._mus.mostrarModal('hospitales', id);
    }

    buscarHospital(texto: string) {
        if (texto.length <= 0) {
            this.cargarHospitales();
            return;
        }

        this.cargando = true;
        this._hs.buscarHospital(texto).subscribe((hospitales: Hospital[]) => {
            // console.log(usuarios);
            this.hospitales = hospitales;
            this.cargando = false;
        });
    }

    guardarHospital(hospital: Hospital) {
        this._hs.actualizarHospital(hospital)
            .subscribe();
    }

    borrarHospital(hospital: Hospital) {
        swal({
            title: '¿Quiere borrar el hospital?',
            text: 'Una vez "' + hospital.nombre + '" esté borrado, no se podrá recuperar!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then((borrar) => {
                // console.log(borrar);

                if (borrar) {
                    this._hs.borrarHospital(hospital._id)
                        .subscribe(resp => {
                            // console.log(resp);
                            this.cargarHospitales();
                        });
                }
            });
    }

    crearHospital() {
        swal('Introduzca el nombre del hospital', {
            title: 'Crear Hospital',
            content: 'input',
            icon: 'info',
            buttons: true
        })
            .then((nombre) => {
                if (!nombre) {
                    return;
                }

                if (nombre.length > 0) {
                    this._hs.crearHospital(nombre).subscribe(() => this.cargarHospitales());
                }
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
        this.cargarHospitales();
    }
}
