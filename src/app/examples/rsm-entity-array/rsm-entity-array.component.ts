
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
    this.rsmEntityStoreService.addItemToStartOfArray('arraySample', generateRandomObject());
  }

  addItemToEndOfArray() {
    this.rsmEntityStoreService.addItemToEndOfArray('arraySample', generateRandomObject());
  }

  addItemToArrayAtIndex() {
    this.rsmEntityStoreService.addItemToArrayAtIndex('arraySample', this.addingItemIndexNumber, generateRandomObject());
  }

  changeAddItemIndexNumber(event: any) {
    this.addingItemIndexNumber = parseInt(event.target.value);
  }

  addSubArrayToStart() {
    const subArray: ArrayModel[] = [generateRandomObject(), generateRandomObject(), generateRandomObject()];
    this.rsmEntityStoreService.addSubArrayToStart('arraySample', subArray);
  }

  addSubArrayToEnd() {
    const subArray: ArrayModel[] = [generateRandomObject(), generateRandomObject(), generateRandomObject()];
    this.rsmEntityStoreService.addSubArrayToEnd('arraySample', subArray);
  }

  addSubArrayAtIndex() {
    const subArray: ArrayModel[] = [generateRandomObject(), generateRandomObject(), generateRandomObject()];
    this.rsmEntityStoreService.addSubArrayAtIndex('arraySample', this.addingSubArrayIndexNumber, subArray);
  }

  changeAddSubArrayIndexNumber(event: any) {
    this.addingSubArrayIndexNumber =  parseInt(event.target.value);
  }
  
  removeArrayItemFromStartOfArray() {
    this.rsmEntityStoreService.removeArrayItemFromStartOfArray('arraySample');
  }

  removeArrayItemFromEndOfArray() {
    this.rsmEntityStoreService.removeArrayItemFromEndOfArray('arraySample');
  }

  removeArrayItemsFromIndex() {
    this.rsmEntityStoreService.removeArrayItemsFromIndex('arraySample', this.removingItemsIndexNumber, this.removingItemsCountNumber);
  }
  
  changeRemoveItemsIndexNumber(event: any) {
    this.removingItemsIndexNumber =  parseInt(event.target.value);
  }

  changeRemoveItemsCountNumber(event: any) {
    this.removingItemsCountNumber =  parseInt(event.target.value);
  }

  removeArrayItemByPropertyValue() {
    this.rsmEntityStoreService.removeArrayItemByPropertyValue('arraySample', this.removingItemPropertyName, this.removingItemPropertyValue);
  }

  changeRemoveItemPropertyName(event: any) {
    this.removingItemPropertyName = event.target.value;
  }

  changeRemoveItemPropertyValue(event: any) {
    this.removingItemPropertyValue = event.target.value;
  }

}