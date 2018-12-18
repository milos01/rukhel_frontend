import {Component, OnInit} from '@angular/core';
import {FileUploadService} from '../file-upload.service';
import {HttpEventType} from '@angular/common/http';
import {SingleFile} from '../model/SingleFile';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

    isHovering: boolean;
    isHidden: boolean;
    buffering: boolean;
    percentage: number;
    uploadedFiles: SingleFile;

    constructor(private fileUpload: FileUploadService) {
        this.buffering = false;
        this.isHidden = true;
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    startUpload(files: FileList) {
        this.isHidden = false;
        const file = new SingleFile();
        file.name = files.item(0).name;
        this.uploadedFiles = file;
        this.fileUpload.postUploadFile(files.item(0)).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const progress = Math.round(event.loaded / event.total * 100);
                console.log(progress);
                if (progress === 100) {
                    this.buffering = true;
                }
                this.percentage = progress;
            } else if (event.type === HttpEventType.Response) {
                this.buffering = false;
                this.isHidden = true;
            }
        });
    }

}
