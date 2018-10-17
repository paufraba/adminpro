import { Pipe, PipeTransform } from '@angular/core';
import { URL_API } from '../config/config';

@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

    transform(imagen: string, tipo: string = 'usuarios'): any {

        const url = URL_API + '/img';

        if (!imagen) {
            return url + '/usuarios/sin_imagen';
        }

        if (imagen.indexOf('https') >= 0) {
            return imagen;
        }

        return url + `/${tipo}/${imagen}`;
    }

}
