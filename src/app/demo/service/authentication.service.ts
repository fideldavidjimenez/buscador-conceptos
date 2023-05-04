import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    loginURL: string = ';'

    constructor(private genericService: GenericService, private http: HttpClient) {
        let configURL;
        if (environment.config_file === 'test') {
            configURL = './assets/config/config.test.json';
        } else if (environment.config_file === 'prod') {
            configURL = `./assets/config/config.prod.json`;
        } else {
            configURL = `assets/config/config.${environment.config_file}.json`;
        }

        this.http.get(configURL).subscribe((config: any) => {
            this.loginURL = config.base_url + '/auth/login';
        });
    }

    login(username: string, password: string) {
        const login = { usuario: username, password: password };
        this.genericService.post(login, this.loginURL).subscribe((response: any) => {
            localStorage.setItem('currentUser', "loggedin");
            localStorage.setItem('currentToken', "loggedin");
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentToken');
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('currentUser') !== null);
    }
} 