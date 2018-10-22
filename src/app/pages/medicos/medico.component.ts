import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicoService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styles: []
})
export class MedicoComponent implements OnInit {
    hospitales: Hospital[] = [];
    medico: Medico = new Medico('', '', '', '', '');
    hospital: Hospital = new Hospital('');

    constructor(public _hs: HospitalService,
        public _ms: MedicoService,
        public router: Router,
        public ruta: ActivatedRoute,
        public _mus: ModalUploadService) {

        ruta.params.subscribe(params => {
            const id = params['id'];

            if (id !== 'nuevo') {
                this.obtenerMedico(id);
            }
        });
    }

    ngOnInit() {
        this._hs.cargarHospitales().subscribe(resp => {
            this.hospitales = resp.hospitales;
        });

        this._mus.notificacion.subscribe(resp => {
            // console.log(resp);
            this.medico.img = resp.medico.img;
        });
    }

    guardarMedico(f: NgForm) {
        // console.log(f.valid);
        // console.log(f.value);

        if (f.valid) {
            this._ms.guardarMedico(this.medico).subscribe(medico => {
                this.medico._id = medico._id;
                this.router.navigate(['/medico', medico._id]);

            });
        }

    }

    cambioHospital(id) {
        this._hs.obtenerHospital(id).subscribe(resp => {
            this.hospital = resp;
        });

    }

    obtenerMedico(id: string) {
        this._ms.obtenerMedico(id).subscribe(medico => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital(this.medico.hospital);
        });
    }

    cambiarImagen() {
        this._mus.mostrarModal('medicos', this.medico._id);
    }

}
