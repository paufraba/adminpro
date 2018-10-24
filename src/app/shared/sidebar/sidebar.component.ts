import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [`.has-arrow.waves-effect.waves-dark.active {
    background: transparent;
    }`]
})
export class SidebarComponent implements OnInit {

    constructor(public _sb: SidebarService,
        public _us: UsuarioService) { }

    ngOnInit() {
        this._sb.cargarMenu();
    }

}
