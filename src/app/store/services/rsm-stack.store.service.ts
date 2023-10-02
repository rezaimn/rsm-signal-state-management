
import { Injectable } from '@angular/core';
import { RsmStackState, initialRsmStackState } from '../models/rsm-stack.model';
import { PublicRsmStackGenericClass } from 'projects/rsm-lib/src/lib/generic-classes/public-rsm-stack-generic';

@Injectable({
  providedIn: 'root'
})
export class RsmStackStoreService extends PublicRsmStackGenericClass<RsmStackState>{
  constructor() { 
    super(initialRsmStackState);
  }
}