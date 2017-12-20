import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { BillService } from '../../shared/services/bill.service'
import { EventService } from '../../shared/services/events.service'
import { CategoriesService } from '../../shared/services/categories.service'
import { Category } from '../../shared/models/category.model';
import { Bill } from '../../shared/models/bill.model';
import { WFMEvent } from '../../shared/models/event.model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

	private message: Message;
	sub1: Subscription;
	sub2: Subscription;

	types = [
		{type: 'income', label: 'доход'},
		{type: 'outcome', label: 'расход'}
	];

	@Input() categories: Category[] = [];

  constructor(private eventsService: EventService,
  						private billService: BillService) { }

  ngOnInit() {
  	this.message = new Message('danger', '');
  }

  ngOnDestroy() {
  	if(this.sub1) this.sub1.unsubscribe();
  	if(this.sub2) this.sub2.unsubscribe();
  }

  showMessage(text: string) {
  	this.message['text'] = text;
  	setTimeout(() => this.message['text'] = '', 3000);
  }

  onSubmit(form: NgForm) {
  	console.log(form.value);
  	let { amount, description, category, type } = form.value;
  	if(amount < 0) { amount *= -1 }

  		console.log(amount, description, category, type);

  	const event = new WFMEvent(
  		type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description
  	);	

  	this.sub1 = this.billService.getBill()
	  	.subscribe((bill: Bill) => {
	  		let value: number = 0;

	  		if(type === 'outcome') {
	  			if(amount > bill[0].value) {
	  				console.log('111', value);
	  				this.showMessage(`недостаточно средств. не хватает ${amount - bill[0].value}`);
	  				return;
	  			} else {
	  				value = bill[0].value - amount;
	  				console.log('222', value);
	  			}
	  		} else {
	  			value = +bill[0].value + +amount;
	  			console.log('333', value);
	  		}

	  		console.log(event);

	  		this.sub2 = this.billService.updateBill({value: +value, currency: bill[0].currency})
	  			.mergeMap(() => this.eventsService.addEvent(event))
	  			.subscribe(() => {
	  				form.setValue({
	  					amount: 0,
	  					description: '',
	  					category: 1,
	  					type: 'outcome'
	  				});
	  			});
	  	}
  	);
  }
}
