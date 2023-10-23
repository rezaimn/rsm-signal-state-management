import {
  Inject,
  NgModule,
} from '@angular/core';
import { _ROOT_EFFECTS_INSTANCES } from '../tokens/effect.tokens';

@NgModule({})
export class RsmEffectsFeatureModule {
  constructor(
    @Inject(_ROOT_EFFECTS_INSTANCES)
    effectsInstanceGroups: unknown[][],
  ) {
  }
}