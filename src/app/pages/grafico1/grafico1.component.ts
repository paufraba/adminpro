import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-grafico1',
    templateUrl: './grafico1.component.html',
    styles: []
})
export class Grafico1Component implements OnInit {

    // Doughnut
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType = 'doughnut';

    graficos: any = {
        'grafico1': {
            'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
            'data': [24, 30, 46],
            'type': 'doughnut',
            'leyenda': 'El pan se come con'
        },
        'grafico2': {
            'labels': ['Hombres', 'Mujeres'],
            'data': [4500, 6000],
            'type': 'doughnut',
            'leyenda': 'Entrevistados'
        },
        'grafico3': {
            'labels': ['Si', 'No'],
            'data': [95, 5],
            'type': 'doughnut',
            'leyenda': '¿Le dan gases los frijoles?'
        },
        'grafico4': {
            'labels': ['No', 'Si'],
            'data': [85, 15],
            'type': 'doughnut',
            'leyenda': '¿Le importa que le den gases?'
        },
    };

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    ngOnInit() {
    }

}
