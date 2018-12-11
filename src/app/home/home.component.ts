import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    task: TaskService;
    myTasks: any;

    constructor(private taskService: TaskService) {
        this.task = taskService;
    }

    ngOnInit() {
        this.myTasks = this.task.getMyTasks().subscribe(
            res => {
                this.myTasks = res;
            });
    }

}
