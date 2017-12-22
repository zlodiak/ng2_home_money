import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    AppComponent
  ],
  imports: [    
    BrowserAnimationsModule,
    HttpClientModule,
  	AppRoutingModule,
  	AuthModule,
    BrowserModule
  ],
  providers: [
    AuthGuard,
    UsersService, 
    AuthService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
