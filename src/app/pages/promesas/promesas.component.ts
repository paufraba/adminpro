import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-promesas',
    templateUrl: './promesas.component.html',
    styles: []
})
export class PromesasComponent implements OnInit {

    constructor() {
        console.log('Iniciando...');

        this.contarTres().then(
            res => console.log('Fin:', res)
        )
            .catch(error => console.error('Error en la promesa:', error)
            );
    }

    ngOnInit() {
    }

    contarTres(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            let contador = 0;
            const intervalo = setInterval(() => {
                contador += 1;
                console.log(contador);


                if (contador === 3) {
                    resolve(true);
                    // reject('Error controlado');
                    clearInterval(intervalo);
                }
            }, 1000);
        });
    }
}
