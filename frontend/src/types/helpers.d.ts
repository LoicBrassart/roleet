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
}

export type {};