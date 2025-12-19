export type LocalStorageSetValue = string;
export type LocalStorageReturnValue = LocalStorageSetValue | null;

export type UseLocalStorage = (
  key: string,
  defaultValue?: string,
) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
];
