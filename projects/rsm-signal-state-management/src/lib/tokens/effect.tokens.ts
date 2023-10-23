import { InjectionToken, Type } from "@angular/core";

export const _ROOT_EFFECTS = new InjectionToken<
  [Array<Type<unknown> | Record<string, unknown>>]
>('@rsm/effects Internal Root Effects');

export const _ROOT_EFFECTS_INSTANCES = new InjectionToken<unknown[]>(
  '@rsm/effects Internal Root Effects Instances'
);