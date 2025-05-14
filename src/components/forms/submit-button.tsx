import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  isLoading: boolean;
  children: ReactNode;
};

export const SubmitButton = ({ isLoading, children }: SubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : children}
    </Button>
  );
};
