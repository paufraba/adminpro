import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styles: []
})
export class ProgressComponent implements OnInit {

    porcentaje1 = 20;
    porcentaje2 = 30;

    constructor() { }

    ngOnInit() {
    }



}
