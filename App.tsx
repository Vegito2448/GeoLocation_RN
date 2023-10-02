import { NavigationContainer } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import PermissionsProvider from './src/context/PermissionContext';
import Navigator from './src/navigation/Navigator';

const AppState = ({ children }: { children: ReactNode; }) => <PermissionsProvider>{children}</PermissionsProvider>;


const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};



export default App;
