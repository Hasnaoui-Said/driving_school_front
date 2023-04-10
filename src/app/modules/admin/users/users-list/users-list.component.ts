import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../models/User";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersListComponent {

  columnsToDisplay = ['username', 'email', 'phone', 'cin'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'accountState'];
  expandedElement: User | undefined;
  @Input('data') dataSource: any;
  @Input('userLength') usersLength: number | undefined;

  @Output() onChangeStateFromUser = new EventEmitter();
  @Output() openAddUserDialog = new EventEmitter();
  @Input()loadingData: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  oncChangeStateFromUser(uuid: any, state: String) {
    this.onChangeStateFromUser.emit({uuid, state})
  }

  onOpenAddUserDialog() {
    this.openAddUserDialog.emit();
  }
}
