import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { Observable } from 'rxjs';
import { URL_API } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
    providedIn: 'root'
})
export class HospitalService {

    constructor(public http: HttpClient,
        public _us: UsuarioService) { }

    cargarHospitales(desde: number = 0): Observable<any> {
        const url = URL_API + '/hospital?desde=' + desde;

        return this.http.get(url);
    }

    obtenerHospital(id: string) {
        const url = URL_API + '/hospital/' + id;

        return this.http.get(url).pipe(
            map((resp: any) => resp.hospital)
        );
    }

    borrarHospital(id: string) {
        const url = URL_API + `/hospital/${id}?token=${this._us.token}`;
        return this.http.delete(url).pipe(
            map(resp => {
                swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', {
                    icon: 'success',
                });

                return true;
            })
        );
    }

    crearHospital(nombre: string) {
        const hospital = new Hospital(nombre);
        const url = URL_API + `/hospital?token=${this._us.token}`;

        return this.http.post(url, hospital).pipe(
            map((resp: any) => {
                swal('Hospital creado', 'El hospital ha sido creado correctamente', {
                    icon: 'success',
                });

                return resp.hospital;
            })
        );
    }

    buscarHospital(texto: string): Observable<any> {
        const url = URL_API + '/busqueda/coleccion/hospitales/' + texto;

        return this.http.get(url).pipe(
            map((resp: any) => resp.hospitales)
        );
    }

    actualizarHospital(hospital: Hospital) {
        const url = URL_API + `/hospital/${hospital._id}?token=${this._us.token}`;

        return this.http.put(url, hospital).pipe(
            map(resp => {
                swal('Hospital modificado', 'El hospital ha sido modificado correctamente', {
                    icon: 'success',
                });

                return true;
            })
        );
    }
}
