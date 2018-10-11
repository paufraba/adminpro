import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {

    usuario: Usuario;
    constructor() { }

    ngOnInit() {
    }

}
