import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() LabelButton!: string;
  @Input() color: string = "";
  @Input() style!: string;
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter();
  // @Input() buttonRef!: String;

  constructor() {
  }

  ngOnInit(): void {
  }

  onButtonClick() {
    this.buttonClick.emit()
  }
}
