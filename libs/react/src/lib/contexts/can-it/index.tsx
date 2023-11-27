import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useCallback,
  useContext,
  useReducer
} from 'react';

import { Comparator, PolicyState } from '@can-it/types';
import { Action } from '../models';

type ActionType = 'set' | 'update';
interface State {
  policy?: PolicyState,
  comparators?: {
    ri?: Comparator;
    action?: Comparator;
  }
}

export type PolicyResolver = (prePolicy?: PolicyState) => PolicyState | undefined;

type PolicyAction<T = State | PolicyResolver> = Action<ActionType, T>;

const PolicyStateContext = createContext<State>({});

const PolicyDispatchContext = createContext<Dispatch<PolicyAction> | undefined>(undefined);

const policyReducer: Reducer<State, PolicyAction> = (state: State, action: PolicyAction) => {
  switch (action.type) {
    case 'set':
      return { ...state, policy: (action.payload as State).policy };

    case 'update':
      return { ...state, policy: (action.payload as PolicyResolver)(state.policy)};
  }
};

interface PolicyProviderProps extends State {
  children: ReactNode;
}

export function CanItProvider({ children, policy, comparators }: PolicyProviderProps) {
  const [state, dispatch] = useReducer<Reducer<State, PolicyAction>>(policyReducer, { policy, comparators });

  return (<PolicyStateContext.Provider value={state}>
    <PolicyDispatchContext.Provider value={dispatch}>
      {children}
    </PolicyDispatchContext.Provider>
  </PolicyStateContext.Provider>);
}

export function usePolicyState() {
  return useContext(PolicyStateContext);
}

export function usePolicyStore() {
  const dispatch = useContext(PolicyDispatchContext);

  if (!dispatch) {
    throw new Error('You can only use this usePolicyDispatch inside PolicyStore children');
  }

  const setPolicy = useCallback(
    (policy?: PolicyState) => dispatch({ type: 'set', payload: { policy } }),
    [dispatch]
  );

  const updatePolicy = useCallback(
    (stateResolver: PolicyResolver) => dispatch({ type: 'update', payload: stateResolver }),
    [dispatch]
  );

  return {
    set: setPolicy,
    update: updatePolicy
  };
}
