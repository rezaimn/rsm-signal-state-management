import { Injectable } from '@angular/core';
import { RsmEntityState, initialRsmEntityState } from '../models/rsm-entity.model';
import { PublicRsmEntityGenericClass } from 'projects/rsm-signal-state-management/src/lib/public-rsm-entity-generic';

@Injectable({
  providedIn: 'root'
})
export class RsmEntityStoreService extends PublicRsmEntityGenericClass<RsmEntityState>{
  constructor() { 
    super(initialRsmEntityState);
  }
}
