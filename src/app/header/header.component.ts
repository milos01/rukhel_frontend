import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {ModalCtrlService} from '../modal-ctrl.service';
import {SigninComponent} from '../signin/signin.component';
import {SignupComponent} from '../signup/signup.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isUserLogged: boolean;
    user: any;
    full_name: string;

    constructor(private userService: UserService,
                private router: Router,
                private modalCtrl: ModalCtrlService) {
    }

    ngOnInit() {
        const logged = this.userService.isLoggedIn();
        if (logged) {
            this.user = this.userService.getUser().subscribe(res => {
                this.user = res;
            });
        }
        this.isUserLogged = logged;
    }

    openSigninModal() {
        this.modalCtrl.openModal(SigninComponent);
    }

    openSignupModal() {
        this.modalCtrl.openModal(SignupComponent);
    }

    getLogout() {
        this.userService.logout();
        this.isUserLogged = false;
        this.router.navigate(['']);
    }


}
