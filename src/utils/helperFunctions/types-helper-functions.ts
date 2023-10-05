export function objMap<
  TObj extends object,
  TMapperFunc extends (k: keyof TObj, v: TObj[keyof TObj]) => any,
  TReturn = TMapperFunc extends (k: keyof TObj, v: TObj[keyof TObj]) => infer R
    ? {
        [k in keyof TObj]: R;
      }
    : never
>(obj: TObj, func: TMapperFunc): TReturn {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, func(k as keyof typeof obj, v)])
  ) as TReturn;
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T; // from lodash

export function truthy<T>(value: T): value is Truthy<T> {
  return !!value;
}
