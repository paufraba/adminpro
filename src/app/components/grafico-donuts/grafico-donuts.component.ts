import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-grafico-donuts',
    templateUrl: './grafico-donuts.component.html',
    styles: []
})
export class GraficoDonutsComponent implements OnInit {

    // Doughnut
    @Input() doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    @Input() doughnutChartData: number[] = [350, 450, 100];
    doughnutChartType = 'doughnut';
    @Input() leyenda: string;

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
