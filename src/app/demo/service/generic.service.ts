import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GenericService {

    endPointReplaySubject = new ReplaySubject(1);
    endPoint: string = '';
    endPointLogin: string = '';

    constructor(private http: HttpClient) {
        let configURL;

        // Ambientes qa y prod
        if (environment.config_file === 'test') {
            configURL = './assets/config/config.test.json';
        }
        // Ambiente de desarrollo
        else if (environment.config_file === 'prod') {
            configURL = `./assets/config/config.prod.json`;
        }
        // Ambiente local
        else {
            configURL = `assets/config/config.${environment.config_file}.json`;
        }

        this.http.get(configURL).subscribe((config: any) => {
            this.endPoint = config.base_url;
            this.endPointLogin = config.base_url + '/auth/login';
            this.endPointReplaySubject.next(true);
        });
    }

    get(url: string): Observable<any> {
        return this.endPointReplaySubject.pipe(mergeMap(() => this.http.get(this.endPoint + url)));
    }

    post(data: any, url: string): Observable<any> {
        return this.endPointReplaySubject.pipe(mergeMap(() => this.http.post(`${this.endPoint}${url}`, data)));
    }

    put(data: any, url: string): Observable<any> {
        return this.endPointReplaySubject.pipe(mergeMap(() => this.http.put(`${this.endPoint}${url}`, data)));
    }

    delete(url: string): Observable<any> {
        return this.endPointReplaySubject.pipe(mergeMap(() => this.http.delete(`${this.endPoint}${url}`)));
    }

    login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const data = {
            'username': username,
            'password': password
        };

        return this.endPointReplaySubject.pipe(mergeMap(() => this.http.post(this.endPointLogin, data, { headers: headers })));
    }
}
