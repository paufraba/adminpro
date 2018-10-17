import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
    constructor(public _us: UsuarioService,
        public router: Router) { }

    canActivate() {
        // console.log('>> Login Guard <<');

        if (this._us.estaLogueado()) {
            // console.log('Acceso OK');

            return true;

        } else {
            console.log('Sin acceso');

            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
