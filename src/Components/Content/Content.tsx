import type React from 'react';

import './Content.css';

interface IContentProps {
  children: React.ReactNode;
}

export const Content: React.FC<IContentProps> = ({ children }) => {
  return <main className="content">{children}</main>;
};
