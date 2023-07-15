import { useState } from 'react';
import { UseSafeState } from './examples/use-safe-state';
import { UseQueryParamsState } from './examples/use-query-params-state';
import { UseLocalSessionStorageExample } from './examples/use-local-session-storage';
import { UseMapSetExample } from './examples/use-map-set';

type Variant =
  | 'use-safe-state'
  | 'use-query-params-state'
  | 'use-local-session-storage'
  | 'use-map-set';

function App() {
  const [variant, setVariant] = useState<Variant>('use-safe-state');
  return (
    <div
      style={{
        margin: '0 auto',
      }}
    >
      <button onClick={() => setVariant('use-safe-state')}>
        use-safe-state
      </button>
      <button onClick={() => setVariant('use-query-params-state')}>
        use-query-params-state
      </button>
      <button onClick={() => setVariant('use-local-session-storage')}>
        use-local-session-storage
      </button>
      <button onClick={() => setVariant('use-map-set')}>use-map-set</button>
      {variant == 'use-safe-state' && <UseSafeState />}
      {variant == 'use-query-params-state' && <UseQueryParamsState />}
      {variant == 'use-local-session-storage' && (
        <UseLocalSessionStorageExample />
      )}
      {variant == 'use-map-set' && <UseMapSetExample />}
    </div>
  );
}

export default App;
