import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { DatePipe } from '@angular/common'; // Import the DatePipe

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { CategoryNavbarComponent } from './layouts/category-navbar/category-navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
 import { ContactUsComponent } from './pages/contact-us/contact-us.component';
 import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { SubscriptionFormsComponent } from './subscription-forms/subscription-forms.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthModule } from './auth/auth.module';
import { PostCardComponent } from './layouts/post-card/post-card.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
 } from '@abacritt/angularx-social-login';

 import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
 import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
 import { ToastrModule } from 'ngx-toastr'; // Import the module
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HomeComponent,
    SingleCategoryComponent,
    SinglePostComponent,
     ContactUsComponent,
      SubscriptionFormsComponent,
    TermsAndConditionComponent,
     CommentFormComponent,
    CommentListComponent,
    PostCardComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,
    NgxSpinnerModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added

     

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '88020331125-l622gkvq002tnlcj729tbq4j7iodo81g.apps.googleusercontent.com'
            )
          },
           
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },DatePipe
  ],  bootstrap: [AppComponent]

})
export class AppModule { }
