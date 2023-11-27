import { Request } from '@can-it/types';
import { ReactNode } from 'react';
import { useCanIt } from '../hooks/use-can-it';

interface CanItProps {
  allowTo: Request,
  children: ReactNode,
  else?: ReactNode
}

export function CanIt({ children, allowTo, else: elseElement }: CanItProps) {
  const isAllowed = useCanIt(...allowTo);

  if (isAllowed) {
    return children;
  }

  return elseElement;
}
