import { useState } from 'react';
import { useEvent } from '../hooks/useEvents';

function getSearchParam(search: string, param: string) {
  const searchParams = new URLSearchParams(search);
  return searchParams.get(param);
}

function setSearchParam(search: string, param: string, value: string) {
  const searchParams = new URLSearchParams(search);
  searchParams.set(param, value);
  return searchParams.toString();
}

const defaultDeserialize = <Value,>(v: string | null) => v as Value;
const defaultSerialize = String;

interface UseSearchParamsStateOption<Value> {
  name: string;
  serialize?: (value: Value) => string;
  deserialize?: (value: string | null) => Value;
}

function useSearchParamsState<Value>({
  name,
  serialize = defaultSerialize,
  deserialize = defaultDeserialize,
}: UseSearchParamsStateOption<Value>) {
  const [value, setValue] = useState(() => {
    const initialValue = deserialize(getSearchParam(location.search, name));

    return initialValue;
  });

  const updateValue = useEvent(newValue => {
    const search = window.location.search;
    const actualNewValue =
      typeof newValue === 'function' ? newValue(value) : newValue;

    setValue(actualNewValue);

    const newSearch = setSearchParam(search, name, serialize(value));

    history.pushState(null, '', `?${newSearch}`);
  });

  return [value, updateValue] as const;
}

const PARAM_NAME = 'name';

export const UseQueryParamsState = () => {
  const [value, setValue] = useSearchParamsState({
    name: PARAM_NAME,
    deserialize: v => v || '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };
  return (
    <div>
      <input placeholder={PARAM_NAME} value={value} onChange={onChange} />
    </div>
  );
};
