import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {ModalCtrlService} from '../modal-ctrl.service';
import {ConfirmationComponent} from '../confirmation/confirmation.component';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-forgotten-password',
    templateUrl: './forgotten-password.component.html',
    styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent {

    constructor(private userService: UserService, private modalCtrl: ModalCtrlService) {
    }

    onSubmit(form: NgForm) {
        this.userService.postResetPassword(form).subscribe();
    }

    _modalHandlde() {
        this.modalCtrl.getActiveModal().close();
        this.modalCtrl.openModal(ConfirmationComponent);
        this.modalCtrl.getActiveModal().componentInstance.data = {
            'messageUpper': 'Link was sent to provided email address.',
            'messageLower': 'Please, check you email.',
            'color': 'orange'
        };
    }
}
