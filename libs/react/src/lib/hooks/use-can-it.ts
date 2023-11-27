import { useEffect, useState } from 'react';
import { usePolicyState } from '../contexts/can-it';
import { CanIt } from '@can-it/core';
import { Request } from '@can-it/types';

export function useCanIt(...request: Request) {
  const [can, setCan] = useState<boolean>();
  const { policy, comparators } = usePolicyState();

  useEffect(() => {
    if (!policy) {
      setCan(undefined);
      return;
    }

    const canIt = new CanIt(policy, comparators?.action, comparators?.ri);
    setCan(canIt.allowTo(...request));
  }, [request, policy, comparators]);

  return can;
}
