import { Injectable } from '@angular/core';
import { PublicPrimitiveRsmGenericClass } from './generic-classes';

interface States {
  stateOne: string;
  stateTwo: number;
}
const initialState:States={
  stateOne:'',
  stateTwo:0
}


@Injectable({
  providedIn: 'root'
})
export class RsmLibService extends PublicPrimitiveRsmGenericClass<States>{

  constructor() { 
    super(initialState);
  }
}
