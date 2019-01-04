import {Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnChanges {
    private _data = new BehaviorSubject([]);
    metaTasks: any;
    taskCategories: any;
    pages: string[];
    filter: any;

    @Input() tasks: any;
    @Input() categories: any;
    @Input() filterData: any;
    @Output() requestPageEvent: EventEmitter<any> = new EventEmitter();
    @Output() requestCategoryEvent: EventEmitter<any> = new EventEmitter();
    @Output() requestSortEvent: EventEmitter<any> = new EventEmitter();

    ngOnChanges(changes: SimpleChanges) {
        if (changes['tasks'] && !changes['tasks'].firstChange) {
            this._generatePaginationArray(changes['tasks'].currentValue);
        }

        if (changes['categories'] && !changes['categories'].firstChange) {
            this.taskCategories = this.categories;
        }

        if (changes['filterData']) {
            this.filter = this.filterData;
        }
    }

    _generatePaginationArray(metadata: any) {
        console.log(metadata);
        if (metadata.items === undefined) {
            return;
        }

        this.metaTasks = this._extractMetadata(this.tasks.items);
        const pagesNumber = Math.ceil(metadata.meta.total / metadata.meta.total_on_page);
        this.pages = new Array(pagesNumber).fill(' ');
    }

    _generateCategoriesArray(categories: any) {
        if (!this.tasks[0]) {
            return;
        }
        this.taskCategories = categories;
    }

    requestPage(filter: any, page: number) {
        filter.page = page;
        this.requestPageEvent.emit(filter);
    }

    requestCategory(filter: any, category: string) {
        filter.category_id = category;
        filter.page = 1;
        this.requestCategoryEvent.emit(filter);
    }

    sortTask(filter: any, status: string) {
        filter.status = status;
        console.log(filter);
        this.requestSortEvent.emit(filter);
    }

    _extractMetadata(tasks) {
        tasks.forEach(task => {
            this._getDayAndMonth(task);
            this._trimString(task);
        });

        return tasks;
    }

    _getDayAndMonth(task) {
        const day = moment(task.created_at).date();
        const month = moment(task.created_at).format('MMMM');

        task.day = day;
        task.month = month;

        return task;
    }

    _trimString(task) {
        if (task.description.length > 140) {
            const description = task.description.substr(0, 140);
            task.trimed_description = description.substr(0, Math.min(description.length, description.lastIndexOf(' '))) + '...';
        } else {
            task.trimed_description = task.description;
        }
        return task;
    }
}

