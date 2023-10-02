import { Injectable } from '@angular/core';
import { RsmQueueState, initialRsmQueueState } from '../models/rsm-queue.model';
import { PublicRsmQueueGenericClass } from 'projects/rsm-lib/src/lib/generic-classes/public-rsm-queue-generic';

@Injectable({
  providedIn: 'root'
})
export class RsmQueueStoreService extends PublicRsmQueueGenericClass<RsmQueueState>{
  constructor() { 
    super(initialRsmQueueState);
  }
}