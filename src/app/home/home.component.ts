import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {HttpParams} from '@angular/common/http';
import {CategoryService} from '../category.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    task: TaskService;
    category: CategoryService;
    filterData: any;
    myTasks: any;
    categories: any;

    constructor(private taskService: TaskService, private categoryService: CategoryService) {
        this.task = taskService;
        this.category = categoryService;
        this.filterData = {
            'term': 'all',
            'category_id': 'math',
            'page': 1
        };
    }

    ngOnInit() {
        const httpParams = this._generateParams(this.filterData);
        this.getCategorties();
        this.task.getMyTasks(httpParams).subscribe(
            res => {
                this.myTasks = res;
            });
    }

    requestPage(page) {
        const initParams = {
            'term': 'all',
            'category_id': 'math',
            'page': page
        };
        const httpParams = this._generateParams(initParams);
        this.myTasks = this._getMyTasks(httpParams);
    }

    requestCategory(data) {
        const httpParams = this._generateParams(data);
        this.myTasks = this._getMyTasks(httpParams);
    }

    _generateParams(params) {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(function (key) {
            httpParams = httpParams.append(key, params[key]);
        });

        return httpParams;
    }

    getCategorties() {
        this.categories = this.category.getCategories().subscribe(
            res => {
                this.categories = res;
            }
        );
    }

    _getMyTasks(httpParams: HttpParams) {

    }

    test(){

    }

}
