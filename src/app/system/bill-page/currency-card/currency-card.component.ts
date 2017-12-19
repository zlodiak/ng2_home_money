import { Component, OnInit, Input } from '@angular/core';

import { Bill } from '../../shared/models/bill.model'


@Component({
  selector: 'wfm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

	@Input() currency: any;	
	@Input() bill: Bill;

	currencies: string[] = ['USD', 'EUR'];

  constructor() { }

  ngOnInit() {
  }

}
