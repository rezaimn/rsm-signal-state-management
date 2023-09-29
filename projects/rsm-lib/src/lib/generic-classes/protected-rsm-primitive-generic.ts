import { signal, computed, Signal, WritableSignal } from '@angular/core';

// Define a type for the store state with keys.
type StoreStateWithKeys<StatesModel> = {
  lastUpdatedKeys: Array<keyof StatesModel> | undefined; // Keeps track of recently updated keys
  state: StatesModel; // The state object itself
};

// A generic class for managing primitive state properties.
export class ProtectedRsmPrimitiveGenericClass<StatesModel extends object> {
  // Create a private state property with an initial value.
  protected readonly privateState: WritableSignal<StoreStateWithKeys<StatesModel>> = signal({
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
    this.setAllStateProperties(initialValues); // Set the initial state
  }

  // Select a specific property from the state.
  public select<K extends keyof StatesModel>(key: K): Signal<StatesModel[K]> {
    return computed(() => this.privateState().state[key]);
  }

  // Set a single state property by key and data.
  protected setStatePropertyByKey<K extends keyof StatesModel>(key: K, data: StatesModel[K]) {
    const objectType = Object.prototype.toString.call(data);
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: [key],
      state: { ...currentValue.state, [key]: objectType === '[object Object]'? { ...data }: data  },
    }));
  }

  // Set all state properties from an object with new values.
  public setAllStateProperties(allStates: StatesModel): void {
    const keys = Object.keys(allStates) as Array<keyof StatesModel>;
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: keys,
      state: { ...allStates },
    }));
  }
}