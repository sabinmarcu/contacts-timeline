// @flow
import { useState, useMemo, useEffect } from "react";

export interface Serializer<T> {
  serialize: T => string,
  deserialize: string => T,
}

export const useLocalstorage = <T>(
  key: string,
  serializer: Serializer<T>,
  initData: string,
): [
  T,
  Function,
] => {
  const localStorageData = useMemo(
    () => localStorage.getItem(key),
    []
  );
  const [value, setValue]: [T, Function] = useState(
    serializer.deserialize(
      localStorageData ||
      initData,
    )
  );
  useEffect(
    () => localStorage.setItem(
      key, 
      serializer.serialize(value)
    ),
    [value],
  );
  return [value, setValue];
}

export default useLocalstorage;