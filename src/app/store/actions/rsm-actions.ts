import { Action } from 'projects/rsm-signal-state-management/src/lib/public-rsm-actions-generic';

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
