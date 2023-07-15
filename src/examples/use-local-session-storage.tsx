import { useState } from 'react';
import {
  PersistentStorage,
  localStorageWrapper,
  sessionStorageWrapper,
} from './local-session-storage-wrapper';
import { useEvent } from '../hooks/useEvents';
import { isFunction } from '../utils';

function createPersistentStateHook(storage: PersistentStorage) {
  return function usePersistentState<Value>(
    name: string,
    initialValue: (() => Value) | Value
  ) {
    const [value, setValue] = useState(() => {
      if (storage.has(name)) {
        return storage.get(name) as Value;
      }

      return isFunction(initialValue) ? initialValue() : initialValue;
    });

    const setState = useEvent((newValue: React.SetStateAction<Value>) => {
      const actualNewValue = isFunction(newValue) ? newValue(value) : newValue;

      storage.set(name, actualNewValue);

      setValue(actualNewValue);
    });

    return [value, setState] as const;
  };
}

const useLocalStorage = createPersistentStateHook(localStorageWrapper);
const useSessionStorage = createPersistentStateHook(sessionStorageWrapper);

export function UseLocalSessionStorageExample() {
  const [localValue, setLocalValue] = useLocalStorage('local-state', '');
  const [sessionValue, setSessionValue] = useSessionStorage(
    'session-state',
    ''
  );

  return (
    <div>
      <h2>Local Value</h2>
      <input
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        type='text'
      />
      <h2>Session Value</h2>
      <input
        value={sessionValue}
        onChange={e => setSessionValue(e.target.value)}
        type='text'
      />
    </div>
  );
}
