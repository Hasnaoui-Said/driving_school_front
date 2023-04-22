import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{

  currentUser: any;
  constructor(private serviceAuth: AuthenticationService) {
  }
  ngOnInit(): void {
    this.serviceAuth.getPrincipal().subscribe(
      value => {
        this.currentUser = value.data;
      }, error => {
        console.log(error)
      }
    )
  }

}
