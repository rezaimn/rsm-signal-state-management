import { Signal, computed } from '@angular/core';
import { ProtectedRsmPrimitiveGenericClass } from './protected-rsm-primitive-generic';

// Extend the base class for managing a queue.
export class ProtectedQueueRsmGenericClass<StatesModel extends object> extends ProtectedRsmPrimitiveGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state (queue size).
  public getQueueSize<K extends keyof StatesModel>(
    key: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length, considering null or undefined values.
      const array = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array?.length;
    });
  }

  // Add an item to the start of an array property (enqueue).
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

  // Remove an item from the end of an array property (dequeue).
  protected removeArrayItemFromEndOfArray<K extends keyof StatesModel>(
    key: K
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (currentValue?.length > 0) {
      // Remove the last item from the array and update the state.
      this.updateStatePropertyByKey(key, currentValue.slice(0, -1) as StatesModel[K]);
    }
  }

  // Add an item to the start of the queue.
  protected addItemToQueue<K extends keyof StatesModel>(
    key: K,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    this.addItemToStartOfArray(key, value);
  }

  // Remove an item from the start of the queue.
  protected removeItemFromQueue<K extends keyof StatesModel>(
    key: K
  ): (StatesModel[K] extends Array<infer U> ? U : null) | null {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if(currentValue?.length > 0) {
      // Remove and return the first item from the array.
      const removedItem: StatesModel[K] extends Array<infer U> ? U : null = currentValue[currentValue.length - 1];
      this.removeArrayItemFromEndOfArray(key);
      return removedItem;
    }
    return null;
  }

  // Add an item to the queue at a specific index (insertion).
  protected addItemToPriorityQueueByIndex<K extends keyof StatesModel>(
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

  // Add an item to the start of the queue (insertion).
  protected addItemToStartOfQueue<K extends keyof StatesModel>(
    key: K,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[key];
    if (Array.isArray(currentValue)) {
      // Add the item to the start of the array and update the state.
      this.updateStatePropertyByKey(key, [...currentValue, value] as StatesModel[K]);
    }
  }
}