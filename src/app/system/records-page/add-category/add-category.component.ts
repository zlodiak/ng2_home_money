import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../../shared/services/categories.service'
import { Category } from '../../shared/models/category.model';


@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription;

	@Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }

  private onSubmit(form: NgForm) {
  	console.log(form, form.value);

  	let { name, capacity } = form.value;
  	if(capacity < 0) {
  		capacity *= -1;
  	}

  	const category = {
  		name: name,
  		capacity: capacity
  	};

  	this.sub1 = this.categoriesService.addCategory(category).subscribe((category: Category) => {
  		console.log(category);
  		form.reset();
  		form.form.patchValue({capacity: 1});

  		this.onCategoryAdd.emit(category);
  	});
  }

}
