import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    userService: any;
    signinErrors: object;
    constructor(userService: UserService, private router: Router) {
        this.userService = userService;
        this.signinErrors = {};
    }

    onSubmit(form: NgForm) {
        this.userService.postSignin(form).subscribe(
            res => {
                this.router.navigate(['home']);
            },
            err => {
                this.signinErrors = err;
            }
        );
    }

    openForgotModal() {
        alert('a');
    }

}
