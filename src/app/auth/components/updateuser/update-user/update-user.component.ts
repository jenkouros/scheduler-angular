import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent extends AppComponentBase implements OnInit {
  loginForm: FormGroup;
  error = '';
  saved = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private userservice: UserService
  ) {
    super();
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        password: ['', Validators.required],
        newpassword: ['', Validators.required]
    }); }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
   }

   if (this.f.password.value === this.f.newpassword.value) {
      this.userservice.update(this.f.password.value)
        .subscribe(r => {
            this.saved = r;
        });

   } else {
      this.error = 'Gesli se ne ujemata';
   }

  }
}
