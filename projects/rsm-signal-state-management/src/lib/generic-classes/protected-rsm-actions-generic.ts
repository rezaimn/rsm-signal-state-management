import { signal, computed, Signal, WritableSignal } from '@angular/core';

export interface Action {
  type: string;
  payload: any;
}

// Define a type for the store state with keys to track changes.
type ActionsStore<ActionTypes> = {
  action: ActionTypes;
};

export class ProtectedRsmActionsGeneric <ActionTypes extends Action> {
  // Private state to hold the data.
  protected readonly privateState: WritableSignal<ActionsStore<ActionTypes>> = signal({
    action: {
      type: '',
      payload: {}
    } as ActionTypes
  });

  // Public signal for external components to access the state.
  readonly store: Signal<ActionsStore<ActionTypes>> = computed(() => {
    return this.privateState();
  });

  // Returns a signal with the action type 
  public actionListener(): Signal<ActionTypes>  {
    return computed(() => this.privateState().action);
  }

  // Dispatch a new action.
  protected dispatchNewAction<T extends ActionTypes>(action: T) {
    this.privateState.update((currentValue) => ({
      ...currentValue,
      action
    }));
  }
}