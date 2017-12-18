import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
	private message: Message;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.message = {
      type: 'danger',
      text: ''
    };

    this.route.queryParams.subscribe((params: Params) => {
      if(params['nowCanLogin']) {
        this.showMessage({text: 'Теперь вы можете зайти в систему', type: 'success'});
      }
    });

  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.required, Validators.email]),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  	});
  }

  private showMessage(message: Message) {
    this.message = message;

    setTimeout(() => {
       this.message['text'] = '';
    }, 5000);
  }

  onSubmit() {
  	const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email).subscribe(
      (user: User) => {
        if(user) {
          if(user['password'] === formData.password) {
            this.message['text'] = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            //this.router.navigate('');
          } else {
            this.showMessage({text: 'пароль не верный', type: 'danger'});
          }
        } else {
          this.showMessage({text: 'такого пользователя нет', type: 'danger'});
        }
      },
      err => console.log(err)
    );
  }

}
