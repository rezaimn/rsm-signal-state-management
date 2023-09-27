import { Action, PublicActionsRsmGeneric } from "./generic-classes/rsm-actions-generic";
import { Injectable } from '@angular/core';

export enum ActionsEnum {
  Login = '[Login Page] Login',
  ChangePassword = '[Change Password] changePassword'
}
export class Login implements Action {
  readonly type = ActionsEnum.Login;
  constructor(public payload: { username: string; password: string }) {}
}
export class ChangePassword implements Action {
  readonly type = ActionsEnum.ChangePassword;
  constructor(public payload: { username: string; password: string }) {}
}
export type ActionTypes = Login | ChangePassword;


@Injectable({
  providedIn: 'root'
})
export class RsmActionsService extends PublicActionsRsmGeneric<ActionTypes>{
  constructor() { 
    super();
  }
}