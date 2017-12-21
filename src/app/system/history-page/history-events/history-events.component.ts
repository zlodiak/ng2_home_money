import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

	@Input() categories: Category[] = [];
	@Input() events: WFMEvent[] = [];

  constructor() { }

  ngOnInit() {
  	this.events.forEach(e => {
  		e.catName = this.categories.find(c => c.id === e.category).name;
  	});
  }

  getEventClass(e) {
  	return {
  		'label': true,
  		'label-danger': e.type === 'outcome',
  		'label-success': e.type === 'income'
  	}
  }

}
