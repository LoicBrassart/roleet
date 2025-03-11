declare global {
  /** Get keys of object that match a type */
  type KeysMatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never;
  }[keyof T];
}

export type {};
