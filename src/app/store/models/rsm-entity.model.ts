
export interface ArrayModel {
  id: number;
  name: string;
}

export interface ObjectModel {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

export const initialObject: ObjectModel = {
  firstName: '',
  lastName: '',
  age: 0,
  email: ''
}

export interface RsmEntityState {
  primitiveSample: number;
  arraySample: ArrayModel[];
  objectSample: ObjectModel;
}

export const initialRsmEntityState : RsmEntityState = {
  primitiveSample: 0,
  arraySample: [],
  objectSample: initialObject
}