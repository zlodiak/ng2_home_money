import { Component, OnInit, Input } from '@angular/core';

import { Bill } from '../../shared/models/bill.model'


@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

	@Input() bill: Bill;
	@Input() currency: any;

	private dollar: number;
	private euro: number;

  constructor() { }

  ngOnInit() {
  	const { rates } = this.currency;
  	console.log(rates['USD'], this.bill[0].value);

  	this.dollar = rates['USD'] * this.bill[0].value;
  	this.euro = rates['EUR'] * this.bill[0].value;

  	console.log(this.dollar);
  	console.log(this.currency);
  }

}
