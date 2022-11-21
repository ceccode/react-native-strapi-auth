import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import DetailScreen1 from '../screens/Detail1';
import ForgotPassScreen from '../screens/ForgotPass';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import ResetPassScreen from '../screens/ResetPass';
import SignupScreen from '../screens/Signup';
import { useAuthenticationState } from '../state/authenticationContext';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createStackNavigator();

function DefaultStackNavigation() {
  const state = useAuthenticationState();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail1" component={DetailScreen1} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      <Stack.Screen name="ResetPass" component={ResetPassScreen} />
      {state.userToken ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Tabs"
          component={BottomTabNavigation}
        />
      ) : (
        <></>
      )}
    </Stack.Navigator>
  );
}

export default DefaultStackNavigation;
