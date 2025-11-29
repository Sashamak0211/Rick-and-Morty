/// <reference types="vite/client" />
declare module '*.png';
declare module '*.ipg';
declare module '*.jpeg';
declare module '*.jpg';

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGSVGElement>
  >;
  const src: string;
  export default src;
}
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
