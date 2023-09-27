import { computed, Signal } from '@angular/core';
import { ProtectedRsmPrimitiveGenericClass } from './protected-rsm-primitive-generic';

// A class for managing entity-specific state with array manipulation methods.
export class ProtectedRsmEntityGenericClass<StatesModel extends object> extends ProtectedRsmPrimitiveGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state.
  public getArraySize<K extends keyof StatesModel>(
    key: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length, considering null or undefined values.
      const array = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array.length;
    });
  }

  // Add an item to the end of an array property.
  protected addItemToEndOfArray<K extends keyof StatesModel>(
    key: K,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[key];
    if (Array.isArray(currentValue)) {
      // Add the item to the end of the array and update the state.
      this.updateStatePropertyByKey(key, [...currentValue, value] as StatesModel[K]);
    }
  }
  
  // Add an item to the start of an array property.
  protected addItemToStartOfArray<K extends keyof StatesModel>(
    key: K,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[key];

    if (Array.isArray(currentValue)) {
      // Add the item to the start of the array and update the state.
      this.updateStatePropertyByKey(key, [value, ...currentValue] as StatesModel[K]);
    }
  }

  // Add an item to an array property at a specific index.
  protected addItemToArrayAtIndex<K extends keyof StatesModel>(
    key: K,
    index: number,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (index >= 0 && index <= currentValue?.length) {
      // Insert the item at the specified index and update the state.
      const newArray = [...currentValue];
      newArray.splice(index, 0, value);
      this.updateStatePropertyByKey(key, newArray as StatesModel[K]);
    }
  }

  // Add a subarray to the start of an array property.
  protected addSubArrayToStart<K extends keyof StatesModel>(
    key: K,
    subArray: Array<StatesModel[K] extends Array<infer U> ? U : never>
  ): void {
    const currentValue = this.privateState().state[key];
  
    if (Array.isArray(currentValue)) {
      // Add the subarray to the start of the array and update the state.
      this.updateStatePropertyByKey(key, [...subArray, ...currentValue] as StatesModel[K]);
    }
  }

  // Add a subarray to the end of an array property.
  protected addSubArrayToEnd<K extends keyof StatesModel>(
    key: K,
    subArray: Array<StatesModel[K] extends Array<infer U> ? U : never>
  ): void {
    const currentValue = this.privateState().state[key];
  
    if (Array.isArray(currentValue)) {
      // Add the subarray to the end of the array and update the state.
      this.updateStatePropertyByKey(key, [...currentValue, ...subArray] as StatesModel[K]);
    }
  }

  // Add a subarray to an array property at a specific index.
  protected addSubArrayAtIndex<K extends keyof StatesModel>(
    key: K,
    index: number,
    subArray: Array<StatesModel[K] extends Array<infer U> ? U : never>
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (index >= 0 && index <= currentValue?.length) {
      // Insert the subarray at the specified index and update the state.
      const newArray = [...currentValue];
      newArray.splice(index, 0, ...subArray);
      this.updateStatePropertyByKey(key, newArray as StatesModel[K]);
    }
  }

  // Remove an item from the start of an array property.
  protected removeArrayItemFromStartOfArray<K extends keyof StatesModel>(
    key: K
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (currentValue?.length > 0) {
      // Remove the first item from the array and update the state.
      this.updateStatePropertyByKey(key, currentValue.slice(1) as StatesModel[K]);
    }
  }

  // Remove an item from the end of an array property.
  protected removeArrayItemFromEndOfArray<K extends keyof StatesModel>(
    key: K
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (currentValue?.length > 0) {
      // Remove the last item from the array and update the state.
      this.updateStatePropertyByKey(key, currentValue.slice(0, -1) as StatesModel[K]);
    }
  }

  // Remove a range of items from an array property starting from a specific index.
  protected removeArrayItemsFromIndex<K extends keyof StatesModel>(
    key: K,
    index: number,
    deleteCount: number
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (index >= 0 && index < currentValue?.length) {
      // Remove items from the array based on the index and count, then update the state.
      this.updateStatePropertyByKey(key, [
        ...currentValue.slice(0, index),
        ...currentValue.slice(index + deleteCount),
      ] as StatesModel[K]);
    }
  }

  // Remove an array item by comparing a property value.
  protected removeArrayItemById<K extends keyof StatesModel>(
    statePropertyKey: K,
    removeKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    itemId: StatesModel[K] extends Array<infer U> ? U[keyof U] : never
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (Array.isArray(currentValue)) {
      // Filter out items based on the specified property value and update the state.
      const updatedArray = currentValue.filter((item: StatesModel[K] extends Array<infer U> ? U : never) => {
        return item[removeKey] != itemId;
      }) as StatesModel[K];
      this.updateStatePropertyByKey(statePropertyKey, updatedArray);
    }
  }

  // Find and return an array item by comparing a property value.
  protected getArrayItemById<K extends keyof StatesModel>(
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

  // Push an item to a stack (end of an array property).
  protected pushToStack<K extends keyof StatesModel>(
    key: K,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    this.addItemToEndOfArray(key, value);
  }

  // Add an item to a queue (start of an array property).
  protected addItemToQueue<K extends keyof StatesModel>(
    key: K,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    this.addItemToStartOfArray(key, value);
  }

  // Pop an item from a stack (end of an array property).
  protected popFromStack<K extends keyof StatesModel>(
    key: K
  ): (StatesModel[K] extends Array<infer U> ? U : null) | null {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if (currentValue?.length > 0) {
      // Remove the last item from the array and return it.
      const removedItem: StatesModel[K] extends Array<infer U> ? U : null = currentValue[currentValue.length - 1];
      this.removeArrayItemFromEndOfArray(key);
      return removedItem;
    }
    return null;
  }

  // Remove an item from a queue (start of an array property).
  protected removeItemFromQueue<K extends keyof StatesModel>(
    key: K
  ): (StatesModel[K] extends Array<infer U> ? U : null) | null {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if (currentValue?.length > 0) {
      // Remove the last item from the array (queue) and return it.
      const removedItem: StatesModel[K] extends Array<infer U> ? U : null = currentValue[currentValue.length - 1];
      this.removeArrayItemFromEndOfArray(key);
      return removedItem;
    }
    return null;
  }
}