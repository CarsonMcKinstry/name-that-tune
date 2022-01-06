import { FC } from 'react';
import { authContext } from './authContext';
import { AuthProps } from '../../types';


const { Provider } = authContext;

export const AuthProvider: FC<AuthProps> = ({ accessToken, children }) => { 
    return <Provider value={accessToken}>{children}</Provider>
}