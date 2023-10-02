import { signal, computed, Signal, WritableSignal } from '@angular/core';

// Define a type for the store state with keys to track changes.
type StoreStateWithKeys<StatesModel> = {
  // lastUpdatedKeys is an array which keeps last updates state property keys, when user updates a single key or bunch of keys, this array will be updated.
  lastUpdatedKeys: Array<keyof StatesModel> | undefined;
  state: StatesModel;
};

// Create a class for managing a generic state using Angular signals.
export class PublicRsmPrimitiveGenericClass<StatesModel extends object> {
  // Private state to hold the data. This must pe private to prevent user write new value directly into the state properties.
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

  // Set a state property in the store. you need to pass the statePropertyKey that shows which state property you wish to update, and the data which is the updating value for that state property
  public setStatePropertyByKey<K extends keyof StatesModel>(statePropertyKey: K, data: StatesModel[K]) {
    const objectType = Object.prototype.toString.call(data);
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: [statePropertyKey],
      state: { ...currentValue.state, [statePropertyKey]: objectType === '[object Object]'? { ...data }: data  },
    }));
  }

  // Set all properties in the store. 
  public setAllStateProperties(allStates: StatesModel): void {
    const keys = Object.keys(allStates) as Array<keyof StatesModel>;
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: keys,
      state: { ...allStates },
    }));
  }
}