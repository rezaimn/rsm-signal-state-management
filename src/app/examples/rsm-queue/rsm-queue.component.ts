
import { Component, inject } from '@angular/core';
import { PriorityQueueModel, SimpleQueueModel } from 'src/app/store/models/rsm-queue.model';
import { RsmQueueStoreService } from 'src/app/store/services/rsm-queue-store.service';
import { generateRandomObject, generateRandomPriorityObject } from 'src/app/utils/random-object-generator';

@Component({
  selector: 'rsm-queue',
  templateUrl: './rsm-queue.component.html',
  styleUrls: ['./rsm-queue.component.css']
})
export class RsmQueueComponent {
  rsmQueueStoreService = inject(RsmQueueStoreService);
 
  selectedSimpleQueueItem: SimpleQueueModel | null = null;
  selectedPriorityQueueItem: PriorityQueueModel | null = null;

  addItemToTheQueue() {
    this.rsmQueueStoreService.addToQueue('simpleQueue', generateRandomObject());
  }

  removeItemFromQueue() {
    this.selectedSimpleQueueItem = this.rsmQueueStoreService.removeFromQueue('simpleQueue');
  }

  addItemToThePriorityQueue() {
    this.rsmQueueStoreService.addToPriorityQueue('priorityQueue','priority','smaller-higher',generateRandomPriorityObject());
  }

  removeItemFromPriorityQueue() {
    this.selectedPriorityQueueItem = this.rsmQueueStoreService.removeFromQueue('priorityQueue');
  }
}