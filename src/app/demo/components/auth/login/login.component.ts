import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Message } from 'primeng/api';
import { GenericService } from 'src/app/demo/service/generic.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    username: string = '';
    password: string = '';

    msgs: Message[] = [];

    constructor(public layoutService: LayoutService, private genericService: GenericService, private _router: Router, private recaptchaV3Service: ReCaptchaV3Service) { }

    login(): void {
        this.msgs = [];

        this.recaptchaV3Service.execute('importantAction')
            .subscribe((token: string) => {
                if (token) {
                    this.genericService.login(this.username, this.password).subscribe({
                        next: (response) => {
                            localStorage.setItem('currentUser', "loggedin");
                            localStorage.setItem('currentToken', response.accessToken);
                            this._router.navigate(['']);
                        },
                        error: (err: any) => {
                            if (err.status === 401) {
                                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Usuario o clave inválida!' });
                            }
                        },
                    });
                } else {
                    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Error en RECAPTACHA' });
                }
            });
    }
}
