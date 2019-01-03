import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {faAt, faCalendarAlt, faEnvelopeOpen, faUnlockAlt, faUserFriends} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    userService: any;
    signupErrors: object;
    faCalendar = faCalendarAlt;
    faFullName = faUserFriends;
    faAt = faAt;
    faUnlockAlt = faUnlockAlt;
    faEnvelopeOpen = faEnvelopeOpen;

    constructor(userService: UserService) {
        this.userService = userService;
        this.signupErrors = {};
    }

    onSubmit(form: NgForm) {
        this.userService.postSignup(form).subscribe(
            res => {
            },
            err => {
                this.signupErrors = err;
            }
        );
    }
}
