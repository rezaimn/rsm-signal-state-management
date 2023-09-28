
export interface ArrayModel {
  id: number;
  name: string;
}

export interface ObjectModel {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

export interface RsmEntityState {
  primitiveSample: number;
  arraySample: ArrayModel[];
  objectSample: ObjectModel | undefined;
}

export const initialRsmEntityState : RsmEntityState = {
  primitiveSample: 0,
  arraySample: [],
  objectSample: undefined
}