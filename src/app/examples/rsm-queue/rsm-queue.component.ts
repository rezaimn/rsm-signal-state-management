
import { Component, inject } from '@angular/core';
import { SimpleQueueModel } from 'src/app/store/models/rsm-queue.model';
import { RsmQueueStoreService } from 'src/app/store/services/rsm-queue-store';
import { generateRandomObject, generateRandomPriorityObject } from 'src/app/utils/random-object-generator';

@Component({
  selector: 'rsm-queue',
  templateUrl: './rsm-queue.component.html',
  styleUrls: ['./rsm-queue.component.css']
})
export class RsmQueueComponent {
  rsmQueueStoreService = inject(RsmQueueStoreService);
 

  addItemToTheQueue() {
    this.rsmQueueStoreService.addItemToQueue('simpleQueue', generateRandomObject());
  }

  removeItemFromQueue() {
    this.rsmQueueStoreService.removeItemFromQueue('simpleQueue');
  }

  addItemToThePriorityQueue() {
    this.rsmQueueStoreService.addItemToPriorityQueueByPriorityKey('priorityQueue','priority','smaller-higher',generateRandomPriorityObject());
  }

  removeItemFromPriorityQueue() {
    this.rsmQueueStoreService.removeItemFromQueue('priorityQueue');
  }
}