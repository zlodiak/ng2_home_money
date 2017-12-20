import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CategoriesService } from '../../shared/services/categories.service'
import { Category } from '../../shared/models/category.model';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription;

	@Input() categories: Category[] = [];
	@Output() onCategoryEdit = new EventEmitter<Category>();

  private currentCategoryId = 1;
  private currentCategory: Category;
  private message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }  

  private onSubmit(form: NgForm) {
    let { capacity, name } = form.value;
    if(capacity < 0) { capacity *= -1; }

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.sub1 = this.categoriesService.updateCategory(category).subscribe((category: Category) => {
      this.onCategoryEdit.emit(category);
      this.message['text'] = 'категория успешно отредактирована';
      setTimeout(() => {
        this.message['text'] ='';
      }, 3000);
    });
  }

  private onCategoryChange() {
    //console.log(this.currentCategoryId);
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

}
