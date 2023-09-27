import { Injectable } from '@angular/core';
import { RsmPrimitiveState, initialRsmPrimitiveState } from '../models/rsm-primitive.model';
import { PublicPrimitiveRsmGenericClass } from 'projects/rsm-lib/src/lib/generic-classes';

@Injectable({
  providedIn: 'root'
})
export class RsmPrimitiveStoreService extends PublicPrimitiveRsmGenericClass<RsmPrimitiveState>{
  constructor() { 
    super(initialRsmPrimitiveState);
  }
}
