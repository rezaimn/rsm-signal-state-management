import { computed, Signal } from '@angular/core';
import { PublicPrimitiveRsmGenericClass } from './public-rsm-primitive-generic';

// Extend the base class to manage generic state.
export class PublicEntityRsmGenericClass<StatesModel extends object> extends PublicPrimitiveRsmGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state.
  public getArraySize<K extends keyof StatesModel>(
    key: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length.
      const array = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array.length;
    });
  }

  // Add an item to the end of an array property.
  public addItemToEndOfArray<K extends keyof StatesModel>(
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
  public addItemToStartOfArray<K extends keyof StatesModel>(
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
  public addItemToArrayAtIndex<K extends keyof StatesModel>(
    key: K,
    index: number,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    console.log(currentValue?.length, index)
    if (index >= 0 && index <= currentValue?.length) {
      // Insert the item at the specified index and update the state.
      const newArray = [...currentValue];
      newArray.splice(index, 0, value);
      this.updateStatePropertyByKey(key, newArray as StatesModel[K]);
    }
  }

  // Add a subarray to the start of an array property.
  public addSubArrayToStart<K extends keyof StatesModel>(
    key: K,
    subArray: Array<StatesModel[K] extends Array<infer U> ? U : never>
  ): void {
    const currentValue = this.privateState().state[key];
  
    if (Array.isArray(currentValue)) {
      // Concatenate the subarray to the start of the array and update the state.
      this.updateStatePropertyByKey(key, [...subArray, ...currentValue] as StatesModel[K]);
    }
  }

  // Add a subarray to the end of an array property.
  public addSubArrayToEnd<K extends keyof StatesModel>(
    key: K,
    subArray: Array<StatesModel[K] extends Array<infer U> ? U : never>
  ): void {
    const currentValue = this.privateState().state[key];
  
    if (Array.isArray(currentValue)) {
      // Concatenate the subarray to the end of the array and update the state.
      this.updateStatePropertyByKey(key, [...currentValue, ...subArray] as StatesModel[K]);
    }
  }

  // Add a subarray to an array property at a specific index.
  public addSubArrayAtIndex<K extends keyof StatesModel>(
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

  // Remove the first item from an array property.
  public removeArrayItemFromStartOfArray<K extends keyof StatesModel>(
    key: K
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (currentValue?.length > 0) {
      // Remove the first item and update the state.
      this.updateStatePropertyByKey(key, currentValue.slice(1) as StatesModel[K]);
    }
  }

  // Remove the last item from an array property.
  public removeArrayItemFromEndOfArray<K extends keyof StatesModel>(
    key: K
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (currentValue?.length > 0) {
      // Remove the last item and update the state.
      this.updateStatePropertyByKey(key, currentValue.slice(0, -1) as StatesModel[K]);
    }
  }

  // Remove items from an array property starting at a specific index.
  public removeArrayItemsFromIndex<K extends keyof StatesModel>(
    key: K,
    index: number,
    deleteCount: number
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if (index >= 0 && index < currentValue?.length && index + deleteCount <= currentValue?.length) {
      // Remove items from the specified index and update the state.
      this.updateStatePropertyByKey(key, [
        ...currentValue.slice(0, index),
        ...currentValue.slice(index + deleteCount),
      ] as StatesModel[K]);
    }
  }

  // Remove an item from an array property by its ID.
  public removeArrayItemByPropertyValue<K extends keyof StatesModel>(
    statePropertyKey: K,
    removeKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    itemId: StatesModel[K] extends Array<infer U> ? U[keyof U] : never
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (Array.isArray(currentValue)) {
      // Filter out the item with the matching ID and update the state.
      const updatedArray = currentValue.filter((item: StatesModel[K] extends Array<infer U> ? U : never) => {
        return item[removeKey] != itemId;
      }) as StatesModel[K];
      this.updateStatePropertyByKey(statePropertyKey, updatedArray);
    }
  }

  // Find an item in an array property by its ID.
  public getArrayItemByPropertyValue<K extends keyof StatesModel>(
    statePropertyKey: K,
    compareKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    compareValue: StatesModel[K] extends Array<infer U> ? U[keyof U] : never
  ): StatesModel[K] extends Array<infer U> ? U : never {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    const item = currentValue?.find((item: StatesModel[K] extends Array<infer U> ? U : never) => {
      return item[compareKey] == compareValue;
    }) as StatesModel[K] extends Array<infer U> ? U : never;
    return item;
  }
}