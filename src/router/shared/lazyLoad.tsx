import { Spin } from "@douyinfe/semi-ui"; 
import React, { Suspense } from "react";

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
};

const lazyLoad = (Component: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense fallback={
      <Spin size="large" style={loadingStyle} />
    }>
      <Component />
    </Suspense>
  );
}

export default lazyLoad;