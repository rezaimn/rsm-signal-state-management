
import { Component, inject, Signal } from '@angular/core';
import { ArrayModel } from 'src/app/store/models/rsm-entity.model';
import { RsmEntityStoreService } from 'src/app/store/services/rsm-entity-store.service';
import { generateRandomObject } from 'src/app/utils/random-object-generator';

@Component({
  selector: 'rsm-entity',
  templateUrl: './rsm-entity-array.component.html',
  styleUrls: ['./rsm-entity-array.component.css']
})
export class RsmEntityArrayComponent {
  rsmEntityStoreService = inject(RsmEntityStoreService);
  addingItemIndexNumber = -1;
  addingSubArrayIndexNumber = -1;
  removingItemsIndexNumber = -1;
  removingItemsCountNumber =0;
  removingItemPropertyName: keyof ArrayModel = 'id';
  removingItemPropertyValue: any;

  addItemToStartOfArray() {
    this.rsmEntityStoreService.addToArray('arraySample', generateRandomObject(), 'start');
  }

  addItemToEndOfArray() {
    this.rsmEntityStoreService.addToArray('arraySample', generateRandomObject(), 'end');
  }

  addItemToArrayAtIndex() {
    this.rsmEntityStoreService.addToArray('arraySample', generateRandomObject(), this.addingItemIndexNumber);
  }

  changeAddItemIndexNumber(event: any) {
    this.addingItemIndexNumber = parseInt(event.target.value);
  }

  addSubArrayToStart() {
    const subArray: ArrayModel[] = [generateRandomObject(), generateRandomObject(), generateRandomObject()];
    this.rsmEntityStoreService.addToArray('arraySample', subArray, 'start');
  }

  addSubArrayToEnd() {
    const subArray: ArrayModel[] = [generateRandomObject(), generateRandomObject(), generateRandomObject()];
    this.rsmEntityStoreService.addToArray('arraySample', subArray, 'end');
  }

  addSubArrayAtIndex() {
    const subArray: ArrayModel[] = [generateRandomObject(), generateRandomObject(), generateRandomObject()];
    this.rsmEntityStoreService.addToArray('arraySample', subArray, this.addingSubArrayIndexNumber);
  }

  changeAddSubArrayIndexNumber(event: any) {
    this.addingSubArrayIndexNumber =  parseInt(event.target.value);
  }
  
  removeArrayItemFromStartOfArray() {
    this.rsmEntityStoreService.removeFromArrayByIndex('arraySample', 'start');
  }

  removeArrayItemFromEndOfArray() {
    this.rsmEntityStoreService.removeFromArrayByIndex('arraySample', 'end');
  }

  removeArrayItemsFromIndex() {
    this.rsmEntityStoreService.removeFromArrayByIndex('arraySample', this.removingItemsIndexNumber, this.removingItemsCountNumber);
  }
  
  changeRemoveItemsIndexNumber(event: any) {
    this.removingItemsIndexNumber =  parseInt(event.target.value);
  }

  changeRemoveItemsCountNumber(event: any) {
    this.removingItemsCountNumber =  parseInt(event.target.value);
  }

  removeArrayItemByPropertyValue() {
    this.rsmEntityStoreService.removeFromArrayByProperty('arraySample', this.removingItemPropertyName, this.removingItemPropertyValue);
  }

  changeRemoveItemPropertyName(event: any) {
    this.removingItemPropertyName = event.target.value;
  }

  changeRemoveItemPropertyValue(event: any) {
    this.removingItemPropertyValue = event.target.value;
  }

}