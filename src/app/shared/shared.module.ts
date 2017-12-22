import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  imports: [
  	NgxChartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoaderComponent,
  	NgxChartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [LoaderComponent]
})
export class SharedModule { }