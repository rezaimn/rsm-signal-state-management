import { InjectionToken, Type, inject } from "@angular/core";

export function createEffectsInstances(
  effectsGroups: Array<Type<unknown> | Record<string, unknown>>[],
): unknown[] {

  const effects: Array<
    Type<unknown> | Record<string, unknown> | InjectionToken<unknown>
  > = [];

  for (const effectsGroup of effectsGroups) {
    effects.push(...effectsGroup);
  }

  return effects.map((effectsTokenOrRecord) =>
    isToken(effectsTokenOrRecord)
      ? inject(effectsTokenOrRecord)
      : effectsTokenOrRecord
  );
}

function isToken(
  tokenOrRecord:
    | Type<unknown>
    | InjectionToken<unknown>
    | Record<string, unknown>
): tokenOrRecord is Type<unknown> | InjectionToken<unknown> {
  return tokenOrRecord instanceof InjectionToken || isClass(tokenOrRecord);
}

export function getClasses(
  classesAndRecords: Array<Type<unknown> | Record<string, unknown>>
): Type<unknown>[] {
  return classesAndRecords.filter(isClass);
}

function isClass(
  classOrRecord: Type<unknown> | Record<string, unknown>
): classOrRecord is Type<unknown> {
  return typeof classOrRecord === 'function';
}
