import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

    subs: Subscription;

    constructor() {

        this.subs = this.devuelveObservable().pipe(
            retry(2)
        )
            .subscribe(
                num => {
                    console.log('Subs:', num);

                }
                , err => console.error('Error:', err)
                , () => console.log('Completado')
            );
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        console.log('Página rxjs cerrada');
        this.subs.unsubscribe();
    }

    devuelveObservable(): Observable<any> {
        return new Observable((observer: Subscriber<any>) => {
            let contador = 0;
            const intervalo = setInterval(() => {
                contador++;

                const salida = {
                    valor: contador
                };

                observer.next(salida);

                // if (contador === 3) {
                //     clearInterval(intervalo);
                //     observer.complete();
                // }

                // if (contador === 2) {
                //     // clearInterval(intervalo);
                //     observer.error('Pete controlado');
                // }
            }, 1000);
        }).pipe(
            map(res => {
                return res.valor;
            }),
            filter((valor, index) => {
                return (valor % 2) === 1;
            })
        );
    }

}
