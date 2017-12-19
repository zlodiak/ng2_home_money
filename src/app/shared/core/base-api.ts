import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BaseApi {

	private baseUrl: string = 'http://localhost:3000/';

	constructor(public http: HttpClient) {}

	private getUrl(url: string = ''): string {
		return this.baseUrl + url;
	}

	get(url: string = ''): Observable<any> {
		return this.http.get(this.getUrl(url));
	}

	post(url: string = '', data: any = {}): Observable<any> {
		return this.http.post(this.getUrl(url), data);
	}	

	put(url: string = '', data: any = {}): Observable<any> {
		return this.http.put(this.getUrl(url), data);
	}		

}