import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RouterModule } from '@angular/router';
 


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule
        
  ]
})
export class AuthModule { }
