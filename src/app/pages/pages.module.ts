// Módulos
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { PagesRoutingModule } from './pages.routes';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafico1Component } from './grafico1/grafico1.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonutsComponent } from '../components/grafico-donuts/grafico-donuts.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Grafico1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonutsComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Grafico1Component,
        PagesComponent,
        GraficoDonutsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule { }
