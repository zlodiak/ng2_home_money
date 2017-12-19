import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { BillService } from './shared/services/bill.service'

import { DropdownDirective } from './shared/directives/dropdown.directive';

import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component'
import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component'
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component'


@NgModule({
	imports: [
		CommonModule, 
		SharedModule, 
		SystemRoutingModule
	],
	declarations: [
		DropdownDirective,
		SystemComponent, 
		BillPageComponent, 
		HistoryPageComponent, 
		PlanningPageComponent, 
		RecordsPageComponent, 
		SidebarComponent, 
		HeaderComponent, BillCardComponent, CurrencyCardComponent
	],
	providers: [BillService]
})
export class SystemModule{}