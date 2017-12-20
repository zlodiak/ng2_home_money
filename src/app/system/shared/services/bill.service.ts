import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';


@Injectable()
export class BillService extends BaseApi{

	constructor(public http: HttpClient) {
		super(http);
	}

	updateBill(bill: Bill): Observable<Bill> {
		return this.put(`bill/1`, bill);
	}

	getBill(): Observable<Bill> {
		return this.get('bill');
	}	

	getCurrency(base: string = 'RUB'): Observable<any> {
		return this.http.get(`https://api.fixer.io/latest?base=${base}`);
	}

}