import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';

import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';


@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

	s1: Subscription;

	private isLoaded: boolean = false;
	private bill: Bill;
	private categories: Category[] = [];
	private events: WFMEvent[] = [];

  constructor(private billService: BillService,
  						private categoriesService: CategoriesService,
  						private eventService: EventService
  ) { }

  ngOnInit() {
  	this.s1 = Observable.combineLatest(
  		this.billService.getBill(),
  		this.categoriesService.getCategories(),
  		this.eventService.getEvents()
  	).subscribe((data: [Bill, any, WFMEvent[]]) => {
  		this.bill = data[0];
  		this.categories = data[1];
  		this.events = data[2];

  		console.log(this.events);

  		this.isLoaded = true;
  	});
  }

  ngOnDestroy() {
  	if(this.s1) this.s1.unsubscribe();
  }  

  private getPercent(cat: Category): number {
  	const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
  	return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
  	return this.getPercent(cat) + '%';
  }

  getCategoryCost(cat: Category): number {
  	const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');

  	return catEvents.reduce((total, e) => {
  		total += e.amount;
  		return total;
  	}, 0);
  }

  getCatColorClass(cat: Category): string {
  	const percent = this.getPercent(cat);
  	return percent < 60 ? 'green' : percent >=100 ? 'red' : 'yellow';
  }

}
