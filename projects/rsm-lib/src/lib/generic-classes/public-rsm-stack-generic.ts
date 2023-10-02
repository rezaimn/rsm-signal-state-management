import { Signal, computed } from '@angular/core';
import { PublicRsmPrimitiveGenericClass } from './public-rsm-primitive-generic';

// Extend the base class for managing a stack.
export class PublicStackRsmGenericClass<StatesModel extends object> extends PublicRsmPrimitiveGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state (stack size).
  public getStackSize<K extends keyof StatesModel>(
    statePropertyKey: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length.
      const array = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array.length;
    });
  }

  // Remove an item from the end of an array property (pop from the stack).
  private removeArrayItemFromEndOfArray<K extends keyof StatesModel>(
    statePropertyKey: K
  ): void {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (Array.isArray(currentValue) && currentValue.length > 0) {
      // Remove the last item from the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, currentValue.slice(0, -1) as StatesModel[K]);
    }
  }

  // Push an item onto an array property (push onto the stack).
  public pushItemToStack<K extends keyof StatesModel>(
    statePropertyKey: K,
    item: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[statePropertyKey];
    if (Array.isArray(currentValue)) {
      // Add the item to the end of the array and update the state.
      this.setStatePropertyByKey(statePropertyKey, [...currentValue, item] as StatesModel[K]);
    }
  }

  // Pop an item from the end of an array property (pop from the stack).
  public popFromStack<K extends keyof StatesModel>(
    statePropertyKey: K
  ): (StatesModel[K] extends Array<infer U> ? U : null) | null {
    const currentValue = this.privateState().state[statePropertyKey] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if(currentValue?.length > 0) {
      // Remove and return the last item from the array.
      const removedItem: StatesModel[K] extends Array<infer U> ? U : null = currentValue[currentValue.length - 1];
      this.removeArrayItemFromEndOfArray(statePropertyKey);
      return removedItem;
    }
    return null;
  }
}