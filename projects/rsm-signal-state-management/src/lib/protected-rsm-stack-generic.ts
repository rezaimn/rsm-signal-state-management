import { Signal, computed } from '@angular/core';
import { ProtectedRsmPrimitiveGenericClass } from './protected-rsm-primitive-generic';

// Extend the base class for managing a stack.
export class ProtectedRsmStackGenericClass<StatesModel extends object> extends ProtectedRsmPrimitiveGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state (stack size).
  public getStackSize<K extends keyof StatesModel>(
    statePropertyKey: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length.
      const array = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array.length;
    });
  }
  // Push an item onto an array property (push onto the stack).
  protected pushToStack<K extends keyof StatesModel>(
    statePropertyKey: K,
    item: (StatesModel[K] extends Array<infer U> ? U : never) | undefined | null
  ): void {
    const currentValue = this.store().state[statePropertyKey];
    if (item && Array.isArray(currentValue)) {
      // Add the item to the end of the array and update the state.
      this.updateState(statePropertyKey, [...currentValue, item] as StatesModel[K]);
    }
  }

  // Pop an item from the end of an array property (pop from the stack).
  protected popFromStack<K extends keyof StatesModel>(
    statePropertyKey: K
  ): (StatesModel[K] extends Array<infer U> ? U : null) | null {
    const currentValue = this.store().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if(Array.isArray(currentValue) && currentValue?.length > 0) {
      // Remove and return the last item from the array.
      const removedItem: StatesModel[K] extends Array<infer U> ? U : null = currentValue[currentValue.length - 1];
      this.updateState(statePropertyKey, currentValue.slice(0, -1) as StatesModel[K]);
      return removedItem;
    }
    return null;
  }
}