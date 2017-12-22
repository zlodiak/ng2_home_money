import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  imports: [
  	NgxChartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
  	NgxChartsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }