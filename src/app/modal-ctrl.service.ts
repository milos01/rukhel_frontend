import {Injectable} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class ModalCtrlService {
    closeResult: string;
    modalReference: any;

    constructor(private modalService: NgbModal) {
    }

    openModal(content) {
        this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});

        this.modalReference.result.then((result) => {
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
            return `with: ${reason}`;
        }
    }

    getActiveModal() {
        return this.modalReference;
    }
}
