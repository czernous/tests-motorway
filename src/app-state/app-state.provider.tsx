import { HTMLAttributes, ReactNode, FC } from 'react';
import { AppContext, useAppReducer } from './app-state.base';

export interface IAppProviderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const AppProvider: FC<IAppProviderProps> = ({ children }) => {
  const contextValue = useAppReducer();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
