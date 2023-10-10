
import { Injectable } from '@angular/core';
import { RsmStackState, initialRsmStackState } from '../models/rsm-stack.model';
import { PublicRsmStackGenericClass } from 'projects/rsm-signal-state-management/src/lib/public-rsm-stack-generic';

@Injectable({
  providedIn: 'root'
})
export class RsmStackStoreService extends PublicRsmStackGenericClass<RsmStackState>{
  constructor() { 
    super(initialRsmStackState);
  }
}