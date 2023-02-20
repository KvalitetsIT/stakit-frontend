import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AnyAbility } from '@casl/ability';

export const AbilityContext = createContext<AnyAbility | null>(null) as React.Context<AnyAbility>;
export const Can = createContextualCan(AbilityContext.Consumer);