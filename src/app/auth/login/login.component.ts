import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
	private message: Message;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.message = {
      type: 'danger',
      text: ''
    };
  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.required, Validators.email]),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  	});
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = {
      type: type,
      text: text
    };

    setTimeout(() => {
       this.message['text'] = '';
    }, 5000);
  }

  onSubmit() {
  	const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email).subscribe(
      (user) => {
        if(user) {
          if(user.password === formData.password) {
            this.showMessage('пароль верный', 'success');
          } else {
            this.showMessage('пароль не верный');
          }
        } else {
          this.showMessage('такого пользователя нет');
        }
      },
      err => console.log(err)
    );
  }

}
