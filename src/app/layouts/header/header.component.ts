import { Component ,OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  showDropdown: boolean = false;
  authState: any = localStorage.getItem('user');
  user: any = JSON.parse(this.authState);
  constructor(private router: Router,
    private authService: SocialAuthService

    ) { }

  ngOnInit(): void {
    console.log(this.user);
    this.authService.authState.subscribe((user) => {     
      localStorage.setItem('user',JSON.stringify(user));
      window.location.reload();
  
     
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
    this.authService.signOut();
    localStorage.removeItem('user');
  window.location.reload();

   }

}
