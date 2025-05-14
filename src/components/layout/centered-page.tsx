import { ReactNode } from 'react';

type CenteredPageProps = {
  children: ReactNode;
};

export const CenteredPage = ({ children }: CenteredPageProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {children}
    </div>
  );
};
