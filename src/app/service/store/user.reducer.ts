// import { createReducer, on } from '@ngrx/store';
// import { increment, decrement, reset } from './user.actions';

// export const initialState = 0;

// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => state - 1),
//   on(reset, (state) => 0)
// );

import { createReducer, on } from '@ngrx/store';
import { googleLogin, googleLogout } from './user.actions';
import { AppState } from './app.state';

 export const initialState: AppState = {
  user: null
};

const _userReducer = createReducer(
  initialState,
  on(googleLogin, (state, { user }) => ({ ...state, user: user })),
  on(googleLogout, (state) => ({ ...state, user: null }))
);

export function userReducer(state: AppState | undefined, action: any) {
  console.log(state,"razzak")
  return _userReducer(state, action);
}