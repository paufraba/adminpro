import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: []
})
export class RxjsComponent implements OnInit {

    constructor() {
        const obs = new Observable(observer => {
            let contador = 0;
            const intervalo = setInterval(() => {
                contador += 1;
                observer.next(contador);

                if (contador === 3) {
                    clearInterval(intervalo);
                    observer.complete();
                }

                // if (contador === 2) {
                //     observer.error('Pete controlado');
                // }
            }, 1000);
        });

        obs.subscribe(
            num => {
                console.log('Subs:', num);

            }
            , err => console.error('Error:', err)
            , () => console.log('Completado')
        );
    }

    ngOnInit() {
    }

}
