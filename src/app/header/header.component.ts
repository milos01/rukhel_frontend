import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    userService: any;
    isUserLogged: boolean;

    constructor(userService: UserService, private router: Router) {
        this.userService = userService;
    }

    ngOnInit() {
        this.isUserLogged = this.userService.isLoggedIn();
    }

    getLogout() {
        this.userService.logout();
        this.isUserLogged = false;
        this.router.navigate(['']);
    }

}
