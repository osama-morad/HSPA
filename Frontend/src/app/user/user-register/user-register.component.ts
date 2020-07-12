import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  formSubmitted: boolean;
  registrationForm: FormGroup;
  userData: User;
  constructor(private fb: FormBuilder, private userService: UserServiceService) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup(
    //   {
    //     userName: new FormControl(null, [Validators.required, Validators.minLength(7)]),
    //     email: new FormControl(null, [ Validators.required, Validators.email ]),
    //     password: new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
    //     confirmPassword: new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
    //     mobile: new FormControl(null, [ Validators.required, Validators.maxLength(11) ])
    //   },this.matchPasswordValidator);
      this.craeteRegistrationForm();
  }

  craeteRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      mobile: [null, [Validators.required, Validators.maxLength(11) ]]
    },{ validators: this.matchPasswordValidator});
  }

  matchPasswordValidator(fg: FormGroup):Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { notmatching: true };
  }

  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }
  get password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }

  onSunmit(){
    console.log(this.registrationForm);
    this.formSubmitted =  true;
    if(this.registrationForm.valid){
      //this.userData = Object.assign(this.userData, this.registrationForm.value);
      //localStorage.setItem('Users', JSON.stringify(this.userData));
      //this.addUserToBrowserLocalStorage(this.userData);
      //this.userData = this.getUserData();
      this.userService.addUserToBrowserLocalStorage(this.getUserData());
      this.registrationForm.reset();
      this.formSubmitted = false;
    }
  }

  getUserData():User {
    return this.userData = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

}
