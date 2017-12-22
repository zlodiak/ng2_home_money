import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';


@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

	selectedPeriod = 'd';
	selectedTypes = [];
	selectedCategories = [];

	timePeriods = [
		{type: 'd', label: 'день'},
		{type: 'w', label: 'неделя'},
		{type: 'M', label: 'месяц'}
	];

	types = [
		{type: 'income', label: 'доход'},
		{type: 'outcome', label: 'расход'}
	];

	@Output() onFilterCancel = new EventEmitter<any>();
	@Output() onFilterApply  = new EventEmitter<any>();

	@Input() categories: Category[] = [];

  constructor() { }

  ngOnInit() {
  }

  closeFilter() {
  	this.selectedTypes = [];
  	this.selectedCategories = [];
  	this.selectedPeriod = 'd';
  	this.onFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
  	if(checked) {
  		this[field].indexOf(value) === -1 ? this[field].push(value) : null;
  	} else {
  		this[field] = this[field].filter(i => i !== value);
  	}
  }

  handleChangeCategory({checked, value}) {
  	this.calculateInputParams('selectedCategories', checked, value);
  }

  handleChangeType({checked, value}) {
  	this.calculateInputParams('selectedTypes', checked, value);
  }

  applyFilter() {
  	this.onFilterApply.emit({
  		types: this.selectedTypes,
  		categories: this.selectedCategories,
  		period: this.selectedPeriod
  	});
  }

}
