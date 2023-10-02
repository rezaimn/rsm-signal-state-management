import { signal, computed, Signal, WritableSignal } from '@angular/core';

// Define a type for the store state with keys to track changes.
type StoreStateWithKeys<StatesModel> = {
  lastUpdatedKeys: Array<keyof StatesModel> | undefined;
  state: StatesModel;
};

// Create a class for managing a generic state using Angular signals.
export class PublicRsmPrimitiveGenericClass<StatesModel extends object> {
  // Private state to hold the data.
  protected readonly privateState: WritableSignal<StoreStateWithKeys<StatesModel>> = signal({
    lastUpdatedKeys: undefined,
    state: {} as StatesModel,
  });

  // Public signal for external components to access the state.
  readonly store: Signal<StoreStateWithKeys<StatesModel>> = computed(() => {
    return this.privateState();
  });

  // Constructor to initialize the state with initial values.
  constructor(initialValues: StatesModel) {
    this.setAllStateProperties(initialValues); // Set initial state
  }

  // Select a specific property from the state.
  public select<K extends keyof StatesModel>(statePropertyKey: K): Signal<StatesModel[K]> {
    return computed(() => this.privateState().state[statePropertyKey]);
  }

  // Expose a readonly state properties.
  readonly state: Signal<StatesModel> = computed(() => {
    return this.privateState().state;
  });

  // Set a single property in the state.
  public setStatePropertyByKey<K extends keyof StatesModel>(statePropertyKey: K, data: StatesModel[K]) {
    const objectType = Object.prototype.toString.call(data);
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: [statePropertyKey],
      state: { ...currentValue.state, [statePropertyKey]: objectType === '[object Object]'? { ...data }: data  },
    }));
  }

  // Update all properties in the state.
  public setAllStateProperties(allStates: StatesModel): void {
    const keys = Object.keys(allStates) as Array<keyof StatesModel>;
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: keys,
      state: { ...allStates },
    }));
  }
}