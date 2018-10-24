import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(public _us: UsuarioService,
        public router: Router) { }

    canActivate(): boolean {

        if (this._us.usuario.role === 'ADMIN_ROLE') {
            return true;
        } else {
            console.log('ADMIN_ROLE necesario');
            // this.router.navigate(['/login']);
            return false;
        }
    }
}
