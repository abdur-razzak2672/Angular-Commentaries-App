import { createAction,props } from '@ngrx/store';
 

 
export const googleLogin = createAction('[User] Google Login', props<{ user: any }>());
export const googleLogout = createAction('[User] Google Logout');