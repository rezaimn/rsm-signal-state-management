import { Injectable, effect,inject, Signal } from '@angular/core';
import { RsmPrimitiveStoreService } from '../services/rsm-primitive-store.service';
import { RsmPrimitiveActionTypes, RsmPrimitiveActionsService, RsmPrimitiveEnum } from '../actions/rsm-primitive-action.service';

@Injectable({
  providedIn: 'root'
})
export class RsmPrimitiveEffectsService{
  rsmPrimitiveStoreService = inject(RsmPrimitiveStoreService);
  rsmPrimitiveActionsService = inject(RsmPrimitiveActionsService);

  constructor() {
    const action = this.rsmPrimitiveActionsService.actionListener();
    this.createEffects(action);
  }

  private createEffects(action: Signal<RsmPrimitiveActionTypes>){
    effect(() => {
      switch(action().type) {
        case RsmPrimitiveEnum.DelayedIncrement: {
          setTimeout(() => {
            this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', action().payload.value);
          }, 2000);
          break;
        }
        case RsmPrimitiveEnum.DelayedDecrement: {
          setTimeout(() => {
            this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', action().payload.value);
          }, 2000);
          break;
        }
      }
    });
  }
}