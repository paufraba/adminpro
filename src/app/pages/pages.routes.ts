import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafico1Component } from './grafico1/grafico1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { titulo: 'Dashboard' }
            },
            {
                path: 'progress',
                component: ProgressComponent,
                data: { titulo: 'Progress' }
            },
            {
                path: 'grafico1',
                component: Grafico1Component,
                data: { titulo: 'Gráficos' }
            },
            {
                path: 'promesas',
                component: PromesasComponent,
                data: { titulo: 'Promesas' }
            },
            {
                path: 'rxjs',
                component: RxjsComponent,
                data: { titulo: 'Obervables(rxjs)' }
            },
            {
                path: 'account-settings',
                component: AccountSettingsComponent,
                data: { titulo: 'Ajustes' }
            },
            {
                path: 'perfil',
                component: ProfileComponent,
                data: { titulo: 'Perfil de usuario' }
            },

            // Mantenimientos
            {
                path: 'usuarios',
                component: UsuariosComponent,
                data: { titulo: 'Mantenimiento de usuarios' }
            },
            {
                path: 'hospitales',
                component: HospitalesComponent,
                data: { titulo: 'Mantenimiento de hospitales' }
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
