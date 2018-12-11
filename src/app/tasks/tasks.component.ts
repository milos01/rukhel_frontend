import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnChanges {
    private _data = new BehaviorSubject([]);
    metaTasks: any;
    pages: string[];

    @Input() tasks: any;
    ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['tasks']) {
            this.metaTasks = this.tasks;
            this.pages = new Array(3).fill('a');
        }
    }

    ngOnInit() {
    }
}
