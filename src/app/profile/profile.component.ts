import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {ModalCtrlService} from '../modal-ctrl.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    errors: object;
    full_name_label: string;
    full_name: string;
    dob: string;
    username: string;
    email: string;

    @Input() data: any;

    constructor(private userService: UserService, private modalCtrl: ModalCtrlService) {
    }

    ngOnInit() {
        this.full_name_label = this.data.user.full_name;
        this.full_name = this.data.user.full_name;
        this.email = this.data.user.email;
    }

    onSubmit(form: NgForm) {
        console.log(this.email);
        this.userService.putUser(form).subscribe(
            res => {
                console.log(this.data.full_name_label = 'adasdasd');
                this.modalCtrl.getActiveModal().close();
            },
            err => {
                this.errors = err;
            }
        );
    }


}
