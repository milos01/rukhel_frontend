import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../category.service';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
    task: any;
    category: any;
    taskCategories: any;
    postData: any;
    category: string;

    constructor(taskService: TaskService, categoryService: CategoryService) {
        this.task = taskService;
        this.category = categoryService;
        this.postData = {};
    }

    ngOnInit() {
       this.category.getCategories().subscribe(
           res => {
               this.taskCategories = res;
           }
       );
    }

    onSubmit(form: NgForm) {
        form.value.category = this.category;
        this.task.postTask(form).subscribe();
    }

    setCategory(name: string) {
        this.category = name;
    }

}
