
import { Component, inject, Signal } from '@angular/core';
import { DelayedDecrement, DelayedIncrement, RsmPrimitiveActionsService } from 'src/app/store/actions/rsm-primitive-action.service';
import { RsmPrimitiveEffectsService } from 'src/app/store/effects/rsm-primitive-effect.service';
import { RsmPrimitiveStoreService } from 'src/app/store/services/rsm-primitive-store.service';

@Component({
  selector: 'rsm-primitive',
  templateUrl: './rsm-primitive.component.html',
  styleUrls: ['./rsm-primitive.component.css']
})
export class RsmPrimitiveComponent {
  rsmPrimitiveStoreService = inject(RsmPrimitiveStoreService);
  rsmPrimitiveActionsService = inject(RsmPrimitiveActionsService);
  rsmPrimitiveEffectsService = inject(RsmPrimitiveEffectsService);
  counterCurrentValue: Signal<number> = this.rsmPrimitiveStoreService.select('counter');
  textCurrentValue: Signal<string> = this.rsmPrimitiveStoreService.select('text');

  increment() {
    this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', this.counterCurrentValue() + 1);
  }

  decrement() {
    this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', this.counterCurrentValue() - 1);
  }

  delayedIncrement() {
    this.rsmPrimitiveActionsService.dispatchNewAction(new DelayedIncrement({value: this.counterCurrentValue() + 1}))
  }

  delayedDecrement() {
    this.rsmPrimitiveActionsService.dispatchNewAction(new DelayedDecrement({value: this.counterCurrentValue() - 1}))

  }

  resetCounter() {
    this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', 0);
  }

  textChange(event: any){
    this.rsmPrimitiveStoreService.setStatePropertyByKey('text', event.target.value);
  }
}