import { StoreModule } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    StoreModule.forRoot({ user: userReducer })
  ],
})
export class AppModule { }