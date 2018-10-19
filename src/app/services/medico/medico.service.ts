import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { URL_API } from 'src/app/config/config';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';

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
}
