
import { Component, inject, Signal } from '@angular/core';
import { DelayedDecrement, DelayedIncrement } from 'src/app/store/actions/rsm-actions';
// import { RsmPrimitiveEffectsService } from 'src/app/store/effects/rsm-primitive-effect.service';
import { RsmActionsService } from 'src/app/store/services/rsm-action.service';
import { RsmPrimitiveStoreService } from 'src/app/store/services/rsm-primitive-store.service';

@Component({
  selector: 'rsm-primitive',
  templateUrl: './rsm-primitive.component.html',
  styleUrls: ['./rsm-primitive.component.css']
})
export class RsmPrimitiveComponent {
  rsmPrimitiveStoreService = inject(RsmPrimitiveStoreService);
  rsmActionsService = inject(RsmActionsService);
  // rsmPrimitiveEffectsService = inject(RsmPrimitiveEffectsService);
  counterCurrentValue: Signal<number> = this.rsmPrimitiveStoreService.select('counter');
  textCurrentValue: Signal<string> = this.rsmPrimitiveStoreService.select('text');

  increment() {
    this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', this.counterCurrentValue() + 1);
  }

  decrement() {
    this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', this.counterCurrentValue() - 1);
  }

  delayedIncrement() {
    this.rsmActionsService.dispatchNewAction(new DelayedIncrement({value: this.counterCurrentValue() + 1}))
  }

  delayedDecrement() {
    this.rsmActionsService.dispatchNewAction(new DelayedDecrement({value: this.counterCurrentValue() - 1}))
  }

  resetCounter() {
    this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', 0);
  }

  textChange(event: any){
    this.rsmPrimitiveStoreService.setStatePropertyByKey('text', event.target.value);
  }
}