import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    BrowserAnimationsModule,
    SystemModule,
    HttpClientModule,
  	AppRoutingModule,
  	AuthModule,
    BrowserModule
  ],
  providers: [
    UsersService, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
