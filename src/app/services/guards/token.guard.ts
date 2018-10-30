import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class TokenGuard implements CanActivate {
    constructor(public _us: UsuarioService,
        public router: Router) {

    }
    canActivate(): Promise<boolean> | boolean {
        console.log('TokenGuard');

        const token = this._us.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        // console.log(payload);

        if (this.tokenExpirado(payload.exp)) {
            console.log('Token expirado');
            this.router.navigate(['/login']);

            return false;
        }

        return this.renovarToken(payload.exp);
    }

    tokenExpirado(fecha: number) {
        const ahora = new Date().getTime() / 1000;

        if (fecha < ahora) {
            return true;
        } else {
            return false;
        }
    }

    renovarToken(fecha: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const tokenExp = new Date(fecha * 1000);
            const ahora = new Date();

            ahora.setTime(ahora.getTime() + (0.5 * 60 * 60 * 1000)); // 4h

            // console.log(tokenExp);
            // console.log(ahora);

            if (tokenExp.getTime() > ahora.getTime()) {
                resolve(true);
            } else {
                this._us.renuevaToken().subscribe(
                    () => {
                        console.log('Token renovado');

                        resolve(true);
                    },
                    () => {
                        this.router.navigate(['/login']);

                        reject(false);
                    });
            }

            resolve(true);
        });
    }
}
