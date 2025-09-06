declare global {
  /** Get keys of object that match a type */
  type KeysMatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never;
  }[keyof T];

  // TypeKey<Campaign, "createdAt", string>;
  type TypeKey<O extends object, K extends keyof O, T> = {
    [Key in keyof O]: Key extends K
      ? T
      : O[Key] extends object
        ? TypeKey<O[Key], K, T>
        : O[Key];
  };

  /**
   * Prettify type by removing any intersection types.
   * @example
   * type A = { foo: string } & { bar: number };
   * type B = Prettify<A>;
   * // B is { foo: string; bar: number; }
   */
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  // type ExtractIDs<T extends object> = {
  //   [K in keyof T]: T[K] extends object ? Pick<T[K], "id"> : T[K];
  // };

  type ExtractRels<T extends object> = {
    [K in keyof T as T[K] extends object ? never : K]: T[K];
  };

  type IsAny<T> = 0 extends 1 & T ? true : false;

  type HasID<T> = T extends { id: unknown } ? true : false;

  type UnknownRecord = Record<string, unknown>;

  type ExtractIDs<T extends UnknownRecord> = Prettify<{
    [K in keyof T as IsAny<T[K]> extends true
      ? K
      : T[K] extends UnknownRecord
        ? `${K}Id`
        : K]: T[K] extends UnknownRecord ? T[K]["id"] : T[K];
  }>;
}

export type {};
