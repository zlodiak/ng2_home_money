import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';
import { WFMEvent } from '../models/event.model';


@Injectable()
export class EventService extends BaseApi {

	constructor(public http: HttpClient) {
		super(http);
	}

	addEvent(event: WFMEvent): Observable<WFMEvent> {
		return this.post('events', event);
	}

	getEvents(): Observable<WFMEvent[]> {
		return this.get('events');
	}

}