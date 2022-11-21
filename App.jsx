import { NavigationContainer } from '@react-navigation/native';

import DefaultStackNavigation from './src/navigation/DefaultStackNavigation';
import { AuthenticationProvider } from './src/state/authenticationContext';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <AuthenticationProvider>
          <DefaultStackNavigation />
        </AuthenticationProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
