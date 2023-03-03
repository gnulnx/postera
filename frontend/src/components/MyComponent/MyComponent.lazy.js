import React, { lazy, Suspense } from 'react';

const LazyMyComponent = lazy(() => import('./MyComponent'));

const MyComponent = props => (
  <Suspense fallback={null}>
    <LazyMyComponent {...props} />
  </Suspense>
);

export default MyComponent;
