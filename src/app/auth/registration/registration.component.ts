import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

	form: FormGroup;

  constructor(private usersService: UsersService, 
              private router: Router) { }

  ngOnInit() {
  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
  		'name': new FormControl(null, [Validators.required]),
  		'agree': new FormControl(false, [Validators.requiredTrue])
  	});   
  }

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const name = this.form.value.name;
    const user = {
      email: email,
      password: password,
      name: name
    };

    this.usersService.createUser(user).subscribe((user: User) => {
      console.log(user);
      this.router.navigate(['/login'], {queryParams: {
        nowCanLogin: true
      }});
    });
  }

  forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value).subscribe((user: User) => {
        if(user) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      });
    });
  }
}
