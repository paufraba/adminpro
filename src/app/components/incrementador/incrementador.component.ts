import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-incrementador',
    templateUrl: './incrementador.component.html',
    styles: []
})
export class IncrementadorComponent implements OnInit {

    @Input() porcentaje = 50;
    @Input() leyenda = 'Leyenda';

    @Output() cambioValor: EventEmitter<number> = new EventEmitter();

    @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef;

    constructor() {

    }

    ngOnInit() {

    }

    onChanges(nuevoValor: number) {
        this.porcentaje = nuevoValor;

        // const html: any = document.getElementsByName('porcentaje')[0];

        // console.log(this.txtPorcentaje);
        // console.log(nuevoValor);

        if (this.porcentaje > 100) {
            this.porcentaje = 100;
        }
        if (this.porcentaje < 0) {
            this.porcentaje = 0;
        }

        // html.value = this.porcentaje;
        this.txtPorcentaje.nativeElement.value = this.porcentaje;

        this.cambioValor.emit(this.porcentaje);
    }

    cambiarValor(valor: number) {
        this.porcentaje += valor;

        if (this.porcentaje > 100) {
            this.porcentaje = 100;
        }
        if (this.porcentaje < 0) {
            this.porcentaje = 0;
        }

        this.cambioValor.emit(this.porcentaje);

    }

}
