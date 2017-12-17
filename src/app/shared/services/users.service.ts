import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {

	constructor(private http: HttpClient) {}

	getUserByEmail(email: string): Observable<User> {
   //  const headers = new Headers();

	 // headers.setHeader("Access-Control-Allow-Origin", "*");

   //  const options = new RequestOptions({ headers: headers });

		const req = `http://localhost:3000/users?email=${email}`;

		return this.http.get(req);
			// .map((response) => response.json())
			// .map((user: User[]) => user[0] ? user[0] : undefined);
	}

}