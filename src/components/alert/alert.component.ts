import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string="";
  @Output() closeClick = new EventEmitter<boolean>();

  openModal(){
    this.closeClick.emit(false);
  }



}
