import { Signal, computed } from '@angular/core';
import { ProtectedRsmPrimitiveGenericClass } from './protected-rsm-primitive-generic';

// Extend the base class for managing a stack.
export class ProtectedStackRsmGenericClass<StatesModel extends object> extends ProtectedRsmPrimitiveGenericClass<StatesModel> {
  
  constructor(initialValues: StatesModel) {
    super(initialValues); // Initialize the state with initial values
  }

  // Get the size of an array property in the state (stack size).
  public getStackSize<K extends keyof StatesModel>(
    key: StatesModel[K] extends Array<infer U> ?  K : never
  ): Signal<number> {
    return computed(() => {
      // Retrieve the array and return its length.
      const array = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
      return array.length;
    });
  }

  // Add an item to the start of an array property (push onto the stack).
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

  // Remove an item from the end of an array property (pop from the stack).
  protected removeArrayItemFromEndOfArray<K extends keyof StatesModel>(
    key: K
  ): void {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;

    if (Array.isArray(currentValue) && currentValue.length > 0) {
      // Remove the last item from the array and update the state.
      this.updateStatePropertyByKey(key, currentValue.slice(0, -1) as StatesModel[K]);
    }
  }

  // Push an item onto an array property (push onto the stack).
  protected pushItemToStack<K extends keyof StatesModel>(
    key: K,
    value: StatesModel[K] extends Array<infer U> ? U : never
  ): void {
    const currentValue = this.privateState().state[key];
    if (Array.isArray(currentValue)) {
      // Add the item to the end of the array and update the state.
      this.updateStatePropertyByKey(key, [...currentValue, value] as StatesModel[K]);
    }
  }

  // Pop an item from the end of an array property (pop from the stack).
  protected popFromStack<K extends keyof StatesModel>(
    key: K
  ): (StatesModel[K] extends Array<infer U> ? U : null) | null {
    const currentValue = this.privateState().state[key] as Array<StatesModel[K] extends Array<infer U> ? U : never>;
    if(currentValue?.length > 0) {
      // Remove and return the last item from the array.
      const removedItem: StatesModel[K] extends Array<infer U> ? U : null = currentValue[currentValue.length - 1];
      this.removeArrayItemFromEndOfArray(key);
      return removedItem;
    }
    return null;
  }
}