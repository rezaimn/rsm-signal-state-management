
import { Component, inject } from '@angular/core';
import { StackModel } from 'src/app/store/models/rsm-stack.model';
import { RsmStackStoreService } from 'src/app/store/services/rsm-stack.store.service';
import { generateRandomObject } from 'src/app/utils/random-object-generator';

@Component({
  selector: 'rsm-stack',
  templateUrl: './rsm-stack.component.html',
  styleUrls: ['./rsm-stack.component.css']
})
export class RsmStackComponent {

  rsmStackStoreService = inject(RsmStackStoreService);
  poppedItem: StackModel | null = null;

  pushItemToTheStack() {
    this.rsmStackStoreService.pushItemToStack('stack', generateRandomObject());
  }

  popItemFromStack() {
    this.poppedItem = this.rsmStackStoreService.popFromStack('stack');
  }
}