import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../../core/services/users.service";
import {User} from "../../../models/User";
import {DiaConfirmComponent} from "../../../shared/dia-confirm/dia-confirm.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  users: any;
  usersLength: number = 0;
  loadingData: boolean = true;

  constructor(private userService: UsersService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      next => {
        this.loadingData = false;
        this.usersLength = next.data.length;
        this.users = next.data;
        console.log(next)
      }, error => {
        console.error(error);
      }
    )
  }

  ChangeStateFromUser($event: any) {
    const dialogRef = this.dialog.open(DiaConfirmComponent, {
      width: '400px',
      data: {
        title: 'Update user',
        message: 'Are you sure you want to change state of this user? ' + $event.uuid,
        state: $event.state,
        confirmRef: 'users'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.userService.changeStateUser($event.uuid, $event.state).subscribe(
          next => {
            console.log(next)
            if (next.success) {
              this.users = this.users.map((user: User) => {
                if (user.uuid == $event.uuid)
                  return {...user, accountState: $event.state}
                return user;
              });
              this.openSnackBar("HttpStatus.Series.SUCCESSFUL: 200", 'X');
              // let message = '{<span id="client-snackbar">Hello World</span>}';
              // this.openSnackBar(message, 'X');
            } else {
              console.warn(next);
              this.openSnackBar("HttpStatus.Series.CLIENT_ERROR : 400", 'X');
            }
          },
          error => {
            console.error(error)
          }
        )
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openAddUserDialog() {
    console.log("open save new user");
    // const dialogRef = this.dialog.open(SignUpComponent, {
    //   width: '600px',
    //   data: {
    //     title: "Save new User",
    //     labelButton: "Add",
    //     labelButtonCancel: "Add",
    //   }
    // });
  }
}
