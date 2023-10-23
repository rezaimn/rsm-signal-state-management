import {
  ModuleWithProviders,
  NgModule,
  Type,
} from '@angular/core';
import { RsmEffectsFeatureModule } from './rsm-effect-feature.module';
import { createEffectsInstances, getClasses } from '../utils/effect.utils';
import { _ROOT_EFFECTS, _ROOT_EFFECTS_INSTANCES } from '../tokens/effect.tokens';


@NgModule({})
export class RsmEffectsModule {
  static forRoot(
    ...rootEffects:
      | Array<Type<unknown> | Record<string, unknown>>
      | [Array<Type<unknown> | Record<string, unknown>>]
  ): ModuleWithProviders<RsmEffectsFeatureModule> {
    const effects = rootEffects.flat();
    const effectsClasses = getClasses(effects);
    return {
      ngModule: RsmEffectsFeatureModule,
      providers: [
        effectsClasses,
        {
          provide: _ROOT_EFFECTS,
          multi: true,
          useValue: effects,
        },
        {
          provide: _ROOT_EFFECTS_INSTANCES,
          useFactory: createEffectsInstances,
          deps: [_ROOT_EFFECTS],
        },
      ],
    };
  }
}



