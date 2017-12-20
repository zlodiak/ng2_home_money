import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { CategoriesService } from '../../shared/services/categories.service'
import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/event.model';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

	types = [
		{type: 'income', label: 'доход'},
		{type: 'outcome', label: 'расход'}
	];

	@Input() categories: Category[] = [];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  	console.log(form.value);
  	let { amount, description, category, type } = form.value;
  	if(amount < 0) { amount *= -1 

  	const event = new WFMEvent(
  		type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description
  	);	

}
