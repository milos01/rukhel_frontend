import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ForgottenPasswordComponent} from '../forgotten-password/forgotten-password.component';
import {ModalCtrlService} from '../modal-ctrl.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    signinErrors: object;
    closeResult: string;

    constructor(private userService: UserService,
                private router: Router,
                private modalService: NgbModal,
                private modalCtrl: ModalCtrlService) {
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
        this.modalCtrl.getActiveModal().close();
        this.modalCtrl.openModal(ForgottenPasswordComponent);
    }
}
