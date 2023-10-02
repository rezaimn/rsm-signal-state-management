export interface StackModel {
  id: number;
  name: string;
}

export interface RsmStackState {
  stack: StackModel[],
}

export const initialRsmStackState : RsmStackState = {
  stack: [],
}