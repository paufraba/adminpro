import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { URL_API } from 'src/app/config/config';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
    providedIn: 'root'
})
export class MedicoService {
    totalMedicos = 0;

    constructor(public http: HttpClient,
        public _us: UsuarioService) { }

    cargarMedicos(desde: number = 0): Observable<any> {
        const url = URL_API + '/medico?desde=' + desde;

        return this.http.get(url).pipe(
            map((resp: any) => {
                this.totalMedicos = resp.total;

                return resp.medicos;
            })
        );
    }

    obtenerMedico(id: string) {
        const url = URL_API + '/medico/' + id;

        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.medico;
            })
        );
    }

    buscarMedico(texto: string): Observable<any> {
        const url = URL_API + '/busqueda/coleccion/medicos/' + texto;

        return this.http.get(url).pipe(
            map((resp: any) => resp.medicos)
        );
    }

    borrarMedico(id: string) {
        const url = URL_API + `/medico/${id}?token=${this._us.token}`;
        return this.http.delete(url).pipe(
            map(resp => {
                swal('Médico borrado', 'El médico ha sido eliminado correctamente', {
                    icon: 'success',
                });

                return true;
            })
        );
    }

    guardarMedico(medico: Medico): Observable<any> {
        let url = URL_API + '/medico';

        if (medico._id) {
            url += `/${medico._id}?token=${this._us.token}`;
            return this.http.put(url, medico).pipe(
                map((resp: any) => {
                    swal('Médico modificado', 'El médico ha sido modificado correctamente', {
                        icon: 'success',
                    });

                    return resp.medico;
                })
            );

        } else {
            url += `?token=${this._us.token}`;
            return this.http.post(url, medico).pipe(
                map((resp: any) => {
                    swal('Médico creado', 'El médico ha sido creado correctamente', {
                        icon: 'success',
                    });

                    return resp.medico;
                })
            );

        }

    }
}
