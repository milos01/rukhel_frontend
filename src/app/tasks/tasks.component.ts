import {Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';
import {TaskService} from '../task.service';

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

    constructor(private taskService: TaskService) {
    }

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

        const bestOfferDate = moment(task.best_offer.created_at).format('DD.MM.YYYY');
        const offer = task.best_offer.offer + '$';

        task.day = day;
        task.month = month;
        task.best_offer.created_at = bestOfferDate;
        task.best_offer.offer = offer;

        return task;
    }

    _trimString(task) {
        if (task.description.length > 140) {
            const description = task.description.substr(0, 130);
            task.trimed_description = description.substr(0, Math.min(description.length, description.lastIndexOf(' '))) + '...';
        } else {
            task.trimed_description = task.description;
        }
        return task;
    }

    acceptOffer(task) {
        this.taskService.getAcceptOffer(task.id, task.best_offer).subscribe(response => {
            const itemIndex = this.metaTasks.findIndex(item => item.id === response.id);
            this.metaTasks[itemIndex] = this._extractMetadata([response])[0];
        });
    }

    declineOffer(task) {
        this.taskService.getDeclineOffer(task).subscribe(response => {
            const itemIndex = this.metaTasks.findIndex(item => item.id === response.id);
            console.log(response);
            this.metaTasks[itemIndex] = this._extractMetadata([response])[0];
        });
    }
}

