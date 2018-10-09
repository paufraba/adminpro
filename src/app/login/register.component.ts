import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

    formulario: FormGroup;

    constructor() { }

    ngOnInit() {
        init_plugins();

        this.formulario = new FormGroup({
            nombre: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required),
            password2: new FormControl(null, Validators.required),
            condiciones: new FormControl(false),
        }, { validators: this.sonIguales('password', 'password2') });

        this.formulario.setValue({
            nombre: 'Test',
            email: 'test@test.com',
            password: '123456',
            password2: '123456',
            condiciones: true
        });
    }

    registrarUsuario() {
        if (this.formulario.invalid) {
            return;
        }

        if (!this.formulario.value.condiciones) {
            console.log('Debe aceptar las condiciones');
            return;
        }

        console.log(this.formulario);
        console.log('Formullario válido', this.formulario.valid);
    }

    sonIguales(campo1: string, campo2: string) {
        return (group: FormGroup) => {
            const pass1 = group.controls[campo1].value;
            const pass2 = group.controls[campo2].value;

            if (pass1 === pass2) {
                return null;
            }

            return { 'sonIguales': true };
        };
    }
}
