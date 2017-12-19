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

  private subCurr: Subscription;
	private subBillCurr: Subscription;

  private currency: any;
  private bill: Bill;

  private isLoaded: boolean = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
  	this.subBillCurr = Observable.combineLatest(
  		this.billService.getBill(),
  		this.billService.getCurrency()
  	).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
  	})
  }

  ngOnDestroy() {
    this.subBillCurr.unsubscribe();
    if(this.subCurr) { this.subCurr.unsubscribe(); }
  }

  private onRefresh() {
    this.isLoaded = false;
    this.subCurr = this.billService.getCurrency().delay(1000).subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }

}
