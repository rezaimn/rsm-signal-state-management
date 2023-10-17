import { Signal, computed } from '@angular/core';
import { PublicRsmPrimitiveGenericClass } from './public-rsm-primitive-generic';

// Extend the base class for managing a queue.
export class PublicRsmQueueGenericClass<StatesModel extends object> extends PublicRsmPrimitiveGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state (queue size).
  public getQueueSize<K extends keyof StatesModel>(
    statePropertyKey: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length, considering null or undefined values.
      const array = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array?.length;
    });
  }

  // Add an item to the start of an array property (enqueue).
  private addItemToStartOfArray<K extends keyof StatesModel>(
    statePropertyKey: K,
    item: (StatesModel[K] extends Array<infer U> ? U : never) | undefined | null
  ): void {
    const currentValue = this.store().state[statePropertyKey];

    if (item && Array.isArray(currentValue)) {
      // Add the item to the start of the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, [item, ...currentValue] as StatesModel[K]);
    }
  }

  // Remove an item from the end of an array property (dequeue).
  private removeArrayItemFromEndOfArray<K extends keyof StatesModel>(
    statePropertyKey: K
  ): void {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (currentValue?.length > 0) {
      // Remove the last item from the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, currentValue.slice(0, -1) as StatesModel[K]);
    }
  }

  // Add an item to the start of the queue.
  public addItemToQueue<K extends keyof StatesModel>(
    statePropertyKey: K,
    item: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    this.addItemToStartOfArray(statePropertyKey, item);
  }

  // Remove an item from the start of the queue.
  public removeItemFromQueue<K extends keyof StatesModel>(
    statePropertyKey: K
  ): (StatesModel[K] extends Array<infer U> ? U : null) | null {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if(currentValue?.length > 0) {
      // Remove and return the first item from the array.
      const removedItem: StatesModel[K] extends Array<infer U> ? U : null = currentValue[currentValue.length - 1];
      this.removeArrayItemFromEndOfArray(statePropertyKey);
      return removedItem;
    }
    return null;
  }

  private addItemToStartOfQueue<K extends keyof StatesModel>(
    statePropertyKey: K,
    item: (StatesModel[K] extends Array<infer U> ? U : never) | undefined | null
  ): void {
    const currentValue = this.store().state[statePropertyKey];
    if (item && Array.isArray(currentValue)) {
      this.setStatePropertyByKey(statePropertyKey, [...currentValue, item] as StatesModel[K]);
    }
  }
  
  // Add an item to the queue at a specific index (insertion).
  public addItemToPriorityQueueByPriorityKey<K extends keyof StatesModel>(
    statePropertyKey: K,
    priorityKey: StatesModel[K] extends Array<infer U> ? keyof U : never,
    priorityOrder: 'smaller-higher' | 'bigger-higher',
    item: (StatesModel[K] extends Array<infer U> ? U : never) | undefined | null
  ): void {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if (Array.isArray(currentValue)) {
      const insertionIndex = currentValue.findIndex(((queueItem: any) => {
        if (item) {
          return priorityOrder === 'smaller-higher' ? item[priorityKey] >= queueItem[priorityKey] : item[priorityKey] <= queueItem[priorityKey];
        }
        return -1;
      }));
      if (item && insertionIndex >= 0) {
        // Insert the item at the specified index and update the state.
        const newArray = [...currentValue];
        newArray.splice(insertionIndex, 0, item);
        this.setStatePropertyByKey(statePropertyKey, newArray as StatesModel[K]);
      } else {
        this.addItemToStartOfQueue(statePropertyKey, item);
      }
    }
  }

}