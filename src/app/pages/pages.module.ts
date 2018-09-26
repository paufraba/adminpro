import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafico1Component } from './grafico1/grafico1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Grafico1Component,
        PagesComponent,
        IncrementadorComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Grafico1Component,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule { }
