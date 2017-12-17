import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private form: FormGroup;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.required, Validators.email]),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  	});
  }

  onSubmit() {
  	const formData = this.form.value;

    console.log(formData.email);

    this.usersService.getUserByEmail(formData.email).subscribe(
      (user) => {
        // console.log(user);
        if(user) {
          if(user['password'] === formData.password) {
            alert('пароль верный');
          } else {
            alert('пароль не верный');
          }
        } else {
          alert('такого пользователя нет');
        }
      },
      err => console.log(err)
    );
  }

}
