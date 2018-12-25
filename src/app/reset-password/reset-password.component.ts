import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    token: string;

    constructor(private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        this.token = this.route.snapshot.paramMap.get('token');
        this.userService.checkEmailHash(this.token).subscribe();
    }

}
