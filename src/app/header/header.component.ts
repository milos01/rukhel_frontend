import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    userService: any;
    isUserLogged: boolean;
    closeResult: string;
    user: any;
    full_name: string;

    constructor(userService: UserService, private router: Router, private modalService: NgbModal) {
        this.userService = userService;
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

    openModal(content) {
        this.modalService.open(content,
            {ariaLabelledBy: 'modal-basic-title', size: 'lg'}
            ).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this._getDismissReason(reason)}`;
        });
    }

    private _getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    getLogout() {
        this.userService.logout();
        this.isUserLogged = false;
        this.router.navigate(['']);
    }

    onSubmit(form) {
        alert('a');
    }

}
