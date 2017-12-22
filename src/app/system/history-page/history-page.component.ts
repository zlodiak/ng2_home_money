import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';

import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';


@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

	isLoaded: boolean = false;
	chartData = [];

	s1: Subscription;

  isFilterVisible = false;

	categories: Category[] = [];
	events: WFMEvent[] = [];

  constructor(private categoriesService: CategoriesService, 
  						private eventService: EventService) { }

  ngOnInit() {
  	this.s1 = Observable.combineLatest(
  		this.categoriesService.getCategories(),
  		this.eventService.getEvents()
  	).subscribe((data: [any, any]) => {
  		this.categories = data[0];
  		this.events = data[1];

  		this.calcChartData();

  		this.isLoaded = true;
  	});
  }

  calcChartData(): void {
  	this.chartData = [];

  	this.categories.forEach((cat) => {
  		const catEvent = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
  		this.chartData.push({
  			name: cat.name,
  			value: catEvent.reduce((total, e) => {
  				total += e.amount;
  				return total;
  			}, 0)
  		});
  	});
  }

  ngOnDestroy() {
  	if(this.s1) this.s1.unsubscribe();
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  onFilterApply(filterData) {
    console.log(filterData);
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
  }
}
