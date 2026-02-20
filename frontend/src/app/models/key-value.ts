export interface KeyValue<T> {
  key: string;
  value: T;
}

export type KeyValueTuple<T> = [string, T];
