import { Injectable } from '@angular/core';
import { PublicEntityRsmGenericClass } from 'projects/rsm-lib/src/lib/generic-classes';
import { RsmEntityState, initialRsmEntityState } from '../models/rsm-entity.model';

@Injectable({
  providedIn: 'root'
})
export class RsmEntityStoreService extends PublicEntityRsmGenericClass<RsmEntityState>{
  constructor() { 
    super(initialRsmEntityState);
  }
}
