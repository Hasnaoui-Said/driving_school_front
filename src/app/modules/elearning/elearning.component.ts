import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MediaMatcher} from "@angular/cdk/layout";
import {SpinnerService} from "../../services/spinner.service";
import {AuthenticationService} from "../../core/services/auth.service";

@Component({
  selector: 'app-elearning',
  templateUrl: './elearning.component.html',
  styleUrls: ['./elearning.component.scss']
})
export class ElearningComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = "";
  isAdmin: boolean = false;

  private autoLogoutSubscription: Subscription = new Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              public spinnerService: SpinnerService,
              private authService: AuthenticationService) {

    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.isAdmin = user.isAdmin;
    this.userName = user.alias;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  logOut() {
    this.authService.logout();
  }
}
