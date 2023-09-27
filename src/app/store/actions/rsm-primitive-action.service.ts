import { Injectable } from '@angular/core';
import { Action, PublicActionsRsmGeneric } from 'projects/rsm-lib/src/lib/generic-classes/rsm-actions-generic';

export enum RsmPrimitiveEnum {
  DelayedIncrement = '[Counter] DelayedIncrement',
  DelayedDecrement = '[Counter] DelayedDecrement'
}

export class DelayedIncrement implements Action {
  readonly type = RsmPrimitiveEnum.DelayedIncrement;
  constructor(public payload: { value: number }) {}
}
export class DelayedDecrement implements Action {
  readonly type = RsmPrimitiveEnum.DelayedDecrement;
  constructor(public payload: { value: number }) {}
}
export type RsmPrimitiveActionTypes = DelayedIncrement | DelayedDecrement;

@Injectable({
  providedIn: 'root'
})
export class RsmPrimitiveActionsService extends PublicActionsRsmGeneric<RsmPrimitiveActionTypes>{
  constructor() { 
    super();
  }
}