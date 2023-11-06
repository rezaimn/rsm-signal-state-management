import { computed, Signal } from '@angular/core';
import { PublicRsmPrimitiveGenericClass } from './public-rsm-primitive-generic';

// Extend the base class to manage generic state.
export class PublicRsmEntityGenericClass<StatesModel extends object> extends PublicRsmPrimitiveGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state.
  public getArraySize<K extends keyof StatesModel>(
    statePropertyKey: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length.
      const array = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array.length;
    });
  }

 
  // Method overloads to support different use cases
  public addToArray<K extends keyof StatesModel>(
    statePropertyKey: K,
    item: (StatesModel[K] extends Array<infer U> ? U : never) | undefined | null,
    index: number | 'start' | 'end'
  ): void;

  public addToArray<K extends keyof StatesModel>(
    statePropertyKey: K,
    subArray: (Array<StatesModel[K] extends Array<infer U> ? U : never>) | undefined | null,
    index: number | 'start' | 'end'
  ): void;

  // Implementation combining the logic of both previous functions
  public addToArray<K extends keyof StatesModel>(
    statePropertyKey: K,
    data: ((StatesModel[K] extends Array<infer U> ? U : never) | undefined | null) | (Array<StatesModel[K] extends Array<infer U> ? U : never> | undefined | null),
    index: number | 'start' | 'end'
  ): void {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if (data && Array.isArray(currentValue)) {
      index = index === 'end' ? currentValue.length : index === 'start' ? 0 : index;
      if (!Array.isArray(data)) {
        data = [data];
      }
      if (data && index >= 0 && index <= currentValue?.length) {
        // Insert the item at the specified index and update the state.
        let newArray = [...currentValue];
        newArray = [
          ...currentValue.slice(0, index), // Elements before the insertion point
          ...data, // Subarray to be inserted
          ...currentValue.slice(index) // Elements after the insertion point
        ];
        this.updateState(statePropertyKey, newArray as StatesModel[K]);
      }
    }
  }
 
  // Update an item of an array property at a specific index.
  public updateArrayItemByIndex<K extends keyof StatesModel>(
    statePropertyKey: K,
    index: number,
    item: (StatesModel[K] extends Array<infer U> ? U : never) | undefined | null
  ): void {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if (item && index >= 0 && index <= currentValue?.length) {
      // Update the item at the specified index and update the state.
      const newArray = [...currentValue];
      newArray[index] = item;
      this.updateState(statePropertyKey, newArray as StatesModel[K]);
    }
  }

  // Update an item from an array property by its property key and value.
  public updateArrayItemByProperty<K extends keyof StatesModel>(
    statePropertyKey: K,
    updatePropertyKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    updatePropertyValue: StatesModel[K] extends Array<infer U> ? U[keyof U] : never,
    updateItem: (StatesModel[K] extends Array<infer U> ? U : never) | undefined | null
  ): void {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (Array.isArray(currentValue)) {
      // Find the item with the matching property key and value and update the state.
      const updateIndex = currentValue.findIndex((item: StatesModel[K] extends Array<infer U> ? U : never) => {
        return item[updatePropertyKey] === updatePropertyValue;
      });
      const newArray = [...currentValue] ;
      if(updateItem && updateIndex >= 0){
        newArray[updateIndex] = updateItem;
      }
      this.updateState(statePropertyKey, newArray as StatesModel[K]);
    }
  }

  /*TODO return removed item*/
  // Remove items from an array property starting at a specific index.
  public removeFromArrayByIndex<K extends keyof StatesModel>(
    statePropertyKey: K,
    index: number | 'start' | 'end',
    deleteCount: number = 1
  ): void {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    index = index === 'end' ? currentValue.length -1 : index === 'start' ? 0 : index;
    if (index >= 0 && index < currentValue?.length && index + deleteCount <= currentValue?.length) {
      // Remove items from the specified index and update the state.
      this.updateState(statePropertyKey, [
        ...currentValue.slice(0, index),
        ...currentValue.slice(index + deleteCount),
      ] as StatesModel[K]);
    }
  }

  /*TODO return removed item and implement removing all the items with the met conditions*/
  // Remove an item from an array property by its property key and value.
  public removeFromArrayByProperty<K extends keyof StatesModel>(
    statePropertyKey: K,
    removePropertyKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    removePropertyValue: StatesModel[K] extends Array<infer U> ? U[keyof U] : never
  ): void {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (Array.isArray(currentValue)) {
      // Filter out the item with the matching property key and value and update the state.
      const updatedArray = currentValue.filter((item: StatesModel[K] extends Array<infer U> ? U : never) => {
        return item[removePropertyKey] != removePropertyValue;
      }) as StatesModel[K];
      this.updateState(statePropertyKey, updatedArray);
    }
  }

  // Find an item in an array property by its property key and value.
  public getArrayItemByProperty<K extends keyof StatesModel>(
    statePropertyKey: K,
    compareKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    compareValue: StatesModel[K] extends Array<infer U> ? U[keyof U] : never
  ): StatesModel[K] extends Array<infer U> ? U : never {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    const item = currentValue?.find((item: StatesModel[K] extends Array<infer U> ? U : never) => {
      return item[compareKey] == compareValue;
    }) as StatesModel[K] extends Array<infer U> ? U : never;
    return item;
  }
}