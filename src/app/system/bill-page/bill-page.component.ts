import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BillService } from '../shared/services/bill.service'
import { Bill } from '../shared/models/bill.model'


@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

	sub: Subscription;

  constructor(private billService: BillService) { }

  ngOnInit() {
  	this.sub = Observable.combineLatest(
  		this.billService.getBill(),
  		this.billService.getCurrency()
  	).subscribe((data: [Bill, any]) => {
  		console.log(data);
  	})
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  }

}
