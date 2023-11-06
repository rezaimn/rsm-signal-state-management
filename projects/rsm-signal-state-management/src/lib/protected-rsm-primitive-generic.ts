import { signal, computed, Signal, WritableSignal } from '@angular/core';

// Define a type for the store state with keys.
type StoreStateWithKeys<StatesModel> = {
  lastUpdatedKeys: Array<keyof StatesModel> | undefined; // Keeps track of recently updated keys
  state: StatesModel; // The state object itself
};

// A generic class for managing primitive state properties.
export class ProtectedRsmPrimitiveGenericClass<StatesModel extends object> {
  // Create a private state property with an initial value.
  private readonly privateState: WritableSignal<StoreStateWithKeys<StatesModel>> = signal({
    lastUpdatedKeys: undefined,
    state: {} as StatesModel,
  });

  // Expose a readonly store property for accessing the state.
  readonly store: Signal<StoreStateWithKeys<StatesModel>> = computed(() => {
    return this.privateState();
  });

  // Expose a readonly state properties.
  readonly state: Signal<StatesModel> = computed(() => {
    return this.privateState().state;
  });
  
  // Constructor to initialize the state with initial values.
  constructor(initialValues: StatesModel) {
    this.setAllStates(initialValues); // Set the initial state
  }

  // Select a specific property from the state.
  public select<K extends keyof StatesModel>(statePropertyKey: K): Signal<StatesModel[K]> {
    return computed(() => this.privateState().state[statePropertyKey]);
  }

  // Method overloads to support different use cases
  protected updateState<K extends keyof StatesModel>(
    statePropertyKey: K,
    data: StatesModel[K]
  ): void;
  
  protected updateState<K extends keyof StatesModel>(
    statePropertyKey: K,
    data: Partial<StatesModel>[K]
  ): void;

  // Implementation combining the logic of both previous functions
  protected updateState<K extends keyof StatesModel>(
    statePropertyKey: K,
    data: StatesModel[K] | Partial<StatesModel>[K]
  ): void {
    const objectType = Object.prototype.toString.call(data);
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: [statePropertyKey],
      state: { ...currentValue.state, [statePropertyKey]: objectType === '[object Object]'? { ...data }: data  },
    }));
  }

  // Set all state properties from an object with new values.
  protected setAllStates(allStatesData: StatesModel): void {
    const keys = Object.keys(allStatesData) as Array<keyof StatesModel>;
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: keys,
      state: { ...allStatesData },
    }));
  }
}