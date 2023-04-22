import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../models/User";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PageEvent} from "@angular/material/paginator";

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
  @Input('content') dataSource: any;
  @Input('numberOfElements') numberOfElements: number | undefined;
  @Input('totalPages') totalPages: number | undefined;
  @Input('pageNumber') pageNumber: number | undefined;
  @Input('totalElements') totalElements: number | undefined;

  @Output() onChangeStateFromUser = new EventEmitter();
  @Output() pageableUsers = new EventEmitter();
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

  pageSizeOptions = [5, 10, 25, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalElements = e.length;
    this.numberOfElements = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.pageableUsers.emit(e);
  }

}
