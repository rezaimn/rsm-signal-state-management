import { Injectable } from '@angular/core';
import { RsmPrimitiveState, initialRsmPrimitiveState } from '../models/rsm-primitive.model';
import { PublicRsmPrimitiveGenericClass } from 'projects/rsm-signal-state-management/src/lib/generic-classes/public-rsm-primitive-generic';

@Injectable({
  providedIn: 'root'
})
export class RsmPrimitiveStoreService extends PublicRsmPrimitiveGenericClass<RsmPrimitiveState>{
  constructor() { 
    super(initialRsmPrimitiveState);
  }
}
