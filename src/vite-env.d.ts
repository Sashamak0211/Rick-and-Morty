/// <reference types="vite/client" />

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGSVGElement>
  >;
  export default ReactComponent;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
