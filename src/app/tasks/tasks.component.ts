import {Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {faCaretRight} from '@fortawesome/free-solid-svg-icons';

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
    faCaretRight: faCaretRight;

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
        if (metadata.items === undefined) { return; }

        this.metaTasks = this.tasks.items;
        const pagesNumber = Math.ceil(metadata.meta.total / metadata.meta.total_on_page);
        this.pages = new Array(pagesNumber).fill(' ');
    }

    _generateCategoriesArray(categories: any) {
        if (!this.tasks[0]) { return; }
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
        if (status !== 'all') {
            filter.status = status;
        } else {
            delete filter['status'];
        }
        console.log(filter);
        this.requestSortEvent.emit(filter);
    }
}
