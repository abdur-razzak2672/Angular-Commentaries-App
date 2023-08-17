import { Component ,OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Store, select } from '@ngrx/store';
  import { Observable } from 'rxjs';
 import { AppState } from 'src/app/service/store/app.state';
import { googleLogin } from '../../service/store/user.actions';
import { googleLogout } from '../../service/store/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  showDropdown: boolean = false;
   user: any  
  constructor(private router: Router,
    private authService: SocialAuthService,
     private userStore: Store<{ user: { user: any } }>


    ) {
       this.userStore.select('user').subscribe((data:any)=>{
        this.user = data.user;
        console.log("user======",this.user);
      })

     }
 

  ngOnInit(): void {
    console.log(",jhgvvbbbvvvvv ",this.user);
    this.authService.authState.subscribe((user) => {   
      
      
      if (user) {
        this.userStore.dispatch(googleLogin({ user:user }));
      }
      else {
        this.userStore.dispatch(googleLogout());
      }
  
     });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    console.log("Dsdfsdf");
  }


    signOut(): void {
      // this.authService.signOut();
      this.userStore.dispatch(googleLogout());
      window.location.reload();
   

   }

}
