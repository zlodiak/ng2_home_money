import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';


@Injectable()
export class CategoriesService extends BaseApi {

	constructor(public http: HttpClient) {
		super(http);
	}

	getCategories(): Observable<Category> {
		return this.get('categories');
	}

	updateCategory(category: Category): Observable<Category> {
		return this.put(`categories/${category.id}`, category);
	};

	addCategory(category: Category): Observable<Category> {
		return this.post('categories', category);
	}

	getCategoryById(id: number): Observable<Category> {
		return this.get(`categories/${id}`);
	}

}