import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {NotificationService} from "../../../core/services/notification.service";
import {AuthenticationService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  signUpForm!: UntypedFormGroup;
  loading!: boolean;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private titleService: Title,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService
  ) {
  }

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    ville: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
    cin: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  passwordMatchValidator(): { [key: string]: boolean } | null {
    const password = this.firstFormGroup.get('password');
    const passwordConfirm = this.firstFormGroup.get('passwordConfirm');

    console.log(password)
    // if (password.value !== passwordConfirm.value) {
    //   return { 'passwordMismatch': true };
    // }

    return null;
  }

  ngOnInit() {
    this.titleService.setTitle('Driving School - Sign Up');
    // this.createForm();
  }

  onSubmit() {
    console.log(this.getUserFromForm());
    this.loading = !this.loading;

    this.authenticationService
      .singUp(this.getUserFromForm())
      .subscribe(
        data => {
          console.log(data)
          localStorage.setItem('savedUserEmail', <string>this.getUserFromForm().email);
          this.router.navigate(['/auth/login']);
        },
        error => {
          console.log(error);
          this.notificationService.openSnackBar("error.error " + error.error);
          this.loading = false;
        }
      );

  }

  getUserFromForm() {
    const lastName = this.firstFormGroup.value.lastName;
    const firstName = this.firstFormGroup.value.firstName;
    const username = this.firstFormGroup.value.username;
    const email = this.firstFormGroup.value.email;
    const phone = this.firstFormGroup.value.phone;
    const ville = this.firstFormGroup.value.ville;
    const address = this.firstFormGroup.value.address;
    const password = this.firstFormGroup.value.password;
    const gender = this.firstFormGroup.value.gender;
    const cin = this.firstFormGroup.value.cin;
    return {
      lastName: lastName,
      firstName: firstName,
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      cin: cin,
      ville: ville,
      address: address,
      password: password,
    }
  }
}
