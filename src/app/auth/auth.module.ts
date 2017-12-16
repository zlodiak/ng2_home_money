import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';

@NgModule({
	declarations: [
		AuthComponent,
		LoginComponent,
		RegistrationComponent
	],
	imports: [
		CommonModule
	]

})
export class AuthModule {}