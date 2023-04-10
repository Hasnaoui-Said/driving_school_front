import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {

  @Input() Title: any;
  @Input() Description: any;
  @Input() disabled: boolean = false;
  @Input() buttonState: boolean = true;
  @Input() LabelButton: any;
  @Input() Image = '';

  @Input() heightImage = '240px';
  @Output() ButtonClickEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onButtonClick(event: Event) {
    this.ButtonClickEvent.emit(event);
  }

}
