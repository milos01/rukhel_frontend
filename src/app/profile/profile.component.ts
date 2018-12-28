import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {ModalCtrlService} from '../modal-ctrl.service';
import {faCalendarAlt, faUserFriends, faAt, faUnlockAlt, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ProfileComponent implements OnInit, OnChanges {
    errors: object;
    dob: Date;
    full_name_label: string;
    faCalendar = faCalendarAlt;
    faFullName = faUserFriends;
    faAt = faAt;
    faUnlockAlt = faUnlockAlt;
    faEnvelopeOpen = faEnvelopeOpen;

    @Input() data: any;

    constructor(private userService: UserService, private modalCtrl: ModalCtrlService) {
    }

    ngOnInit() {
        this.full_name_label = this.data.user.full_name;
        this.dob = new Date(this.data.user.dob);
    }

    onSubmit(form: NgForm) {
        this.userService.putUser(form).subscribe(
            res => {
                this.modalCtrl.getActiveModal().close();
            },
            err => {
                this.errors = err;
            }
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes['data']);
    }
}
