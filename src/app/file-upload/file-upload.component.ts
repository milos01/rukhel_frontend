import {Component, OnInit} from '@angular/core';
import {FileUploadService} from '../file-upload.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

    isHovering: boolean;

    constructor(private fileUpload: FileUploadService) {
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    startUpload(files: FileList) {
        this.fileUpload.postUploadFile(files.item(0)).subscribe();
        console.log(files);
    }

}
