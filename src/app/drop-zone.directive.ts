import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[appDropZone]'
})
export class DropZoneDirective {
    @Output() droppedEvent: EventEmitter<FileList> = new EventEmitter();
    @Output() hoveredEvent: EventEmitter<boolean> = new EventEmitter();

    constructor() {
    }

    @HostListener('drop', ['$event'])
    onDrop($event) {
        $event.preventDefault();
        this.droppedEvent.emit($event.dataTransfer.files);
        this.hoveredEvent.emit(true);
    }

    @HostListener ('dragover', ['$event'])
    onDragOver($event) {
        $event.preventDefault();
        this.hoveredEvent.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave($event) {
        $event.preventDefault();
        this.hoveredEvent.emit(false);
    }

}
