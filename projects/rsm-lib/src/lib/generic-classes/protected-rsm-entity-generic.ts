import { computed, Signal } from '@angular/core';
import { ProtectedRsmPrimitiveGenericClass } from './protected-rsm-primitive-generic';

// A class for managing entity-specific state with array manipulation methods.
export class ProtectedRsmEntityGenericClass<StatesModel extends object> extends ProtectedRsmPrimitiveGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state.
  public getArraySize<K extends keyof StatesModel>(
    statePropertyKey: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length, considering null or undefined values.
      const array = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array.length;
    });
  }

  // Update an Object property partially by key and data.
  public updateExistingObjectPartiallyByPropertyKey<K extends keyof StatesModel>(statePropertyKey: K, data: Partial<StatesModel>[K]) {
    const objectType = Object.prototype.toString.call(data);
    const currentValue = this.privateState().state[statePropertyKey];
    if (objectType === '[object Object]') {
      this.setStatePropertyByKey(statePropertyKey, { ...currentValue, ...data });
    }
  }

  // Add an item to the end of an array property.
  protected addItemToEndOfArray<K extends keyof StatesModel>(
    statePropertyKey: K,
    item: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[statePropertyKey];
    if (Array.isArray(currentValue)) {
      // Add the item to the end of the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, [...currentValue, item] as StatesModel[K]);
    }
  }
  
  // Add an item to the start of an array property.
  protected addItemToStartOfArray<K extends keyof StatesModel>(
    statePropertyKey: K,
    item: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[statePropertyKey];

    if (Array.isArray(currentValue)) {
      // Add the item to the start of the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, [item, ...currentValue] as StatesModel[K]);
    }
  }

  // Add an item to an array property at a specific index.
  protected addItemToArrayAtIndex<K extends keyof StatesModel>(
    statePropertyKey: K,
    index: number,
    item: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (index >= 0 && index <= currentValue?.length) {
      // Insert the item at the specified index and update the state.
      const newArray = [...currentValue];
      newArray.splice(index, 0, item);
      this.setStatePropertyByKey(statePropertyKey, newArray as StatesModel[K]);
    }
  }

  // Add a subarray to the start of an array property.
  protected addSubArrayToStart<K extends keyof StatesModel>(
    statePropertyKey: K,
    subArray: Array<StatesModel[K] extends Array<infer U> ? U : never>
  ): void {
    const currentValue = this.privateState().state[statePropertyKey];
  
    if (Array.isArray(currentValue)) {
      // Add the subarray to the start of the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, [...subArray, ...currentValue] as StatesModel[K]);
    }
  }

  // Add a subarray to the end of an array property.
  protected addSubArrayToEnd<K extends keyof StatesModel>(
    statePropertyKey: K,
    subArray: Array<StatesModel[K] extends Array<infer U> ? U : never>
  ): void {
    const currentValue = this.privateState().state[statePropertyKey];
  
    if (Array.isArray(currentValue)) {
      // Add the subarray to the end of the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, [...currentValue, ...subArray] as StatesModel[K]);
    }
  }

  // Add a subarray to an array property at a specific index.
  protected addSubArrayAtIndex<K extends keyof StatesModel>(
    statePropertyKey: K,
    index: number,
    subArray: Array<StatesModel[K] extends Array<infer U> ? U : never>
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (index >= 0 && index <= currentValue?.length) {
      // Insert the subarray at the specified index and update the state.
      const newArray = [...currentValue];
      newArray.splice(index, 0, ...subArray);
      this.setStatePropertyByKey(statePropertyKey, newArray as StatesModel[K]);
    }
  }

  // Remove an item from the start of an array property.
  protected removeArrayItemFromStartOfArray<K extends keyof StatesModel>(
    statePropertyKey: K
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (currentValue?.length > 0) {
      // Remove the first item from the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, currentValue.slice(1) as StatesModel[K]);
    }
  }

  // Remove an item from the end of an array property.
  protected removeArrayItemFromEndOfArray<K extends keyof StatesModel>(
    statePropertyKey: K
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (currentValue?.length > 0) {
      // Remove the last item from the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, currentValue.slice(0, -1) as StatesModel[K]);
    }
  }

  // Remove a range of items from an array property starting from a specific index.
  protected removeArrayItemsFromIndex<K extends keyof StatesModel>(
    statePropertyKey: K,
    index: number,
    deleteCount: number
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (index >= 0 && index < currentValue?.length && index + deleteCount <= currentValue?.length) {
      // Remove items from the array based on the index and count, then update the state.
      this.setStatePropertyByKey(statePropertyKey, [
        ...currentValue.slice(0, index),
        ...currentValue.slice(index + deleteCount),
      ] as StatesModel[K]);
    }
  }

  // Remove an array item by comparing a property value.
  protected removeArrayItemByPropertyValue<K extends keyof StatesModel>(
    statePropertyKey: K,
    removePropertyKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    removePropertyValue: StatesModel[K] extends Array<infer U> ? U[keyof U] : never
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (Array.isArray(currentValue)) {
      // Filter out items based on the specified property value and update the state.
      const updatedArray = currentValue.filter((item: StatesModel[K] extends Array<infer U> ? U : never) => {
        return item[removePropertyKey] != removePropertyValue;
      }) as StatesModel[K];
      this.setStatePropertyByKey(statePropertyKey, updatedArray);
    }
  }

  // Find and return an array item by comparing a property value.
  protected getArrayItemByPropertyValue<K extends keyof StatesModel>(
    statePropertyKey: K,
    removeKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    itemId: StatesModel[K] extends Array<infer U> ? U[keyof U] : never
  ): StatesModel[K] extends Array<infer U> ? U : never   {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    const item = currentValue?.find((item: StatesModel[K] extends Array<infer U> ? U : never) => {
      return item[removeKey] == itemId;
    }) as StatesModel[K] extends Array<infer U> ? U : never;

    return item;
  }
}