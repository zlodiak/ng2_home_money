import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

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
	filteredEvents: WFMEvent[] = [];

  constructor(private categoriesService: CategoriesService, 
  						private eventService: EventService) { }

  ngOnInit() {
  	this.s1 = Observable.combineLatest(
  		this.categoriesService.getCategories(),
  		this.eventService.getEvents()
  	).subscribe((data: [any, any]) => {
  		this.categories = data[0];
  		this.events = data[1];

      this.setOriginalEvents();
  		this.calcChartData();

  		this.isLoaded = true;
  	});
  }

  private setOriginalEvents() {
     this.filteredEvents = this.events.slice();
  }

  calcChartData(): void {
  	this.chartData = [];

  	this.categories.forEach((cat) => {
  		const catEvent = this.filteredEvents.filter(e => e.category === cat.id && e.type === 'outcome');
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
    this.toggleFilterVisibility(false);
    this.filteredEvents();
    console.log(filterData); 

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).startOf('d');

    this.filteredEvents = this.filteredEvents.filter((e) => {
      return filterData.types.indexOf(e.type) !== -1;
    })
    .filter(() => {
      return filterData.categories.indexOf(e.category.toString()) !== -1;
    })
    .filter((e) => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss')
      return momentDate.isBetween(startPeriod, endPeriod);
    });

    this.calcChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calcChartData();
  }
}
