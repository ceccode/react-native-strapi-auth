import { Text, View, Button } from 'react-native';

import { useAuthenticationDispatch } from '../state/authenticationContext';

const HomeScreen = (props) => {
  const dispatch = useAuthenticationDispatch();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => props.navigation.navigate('Detail1')} />
      <Button title="Go to Tabspage" onPress={() => props.navigation.navigate('Tabs')} />
      <Button title="Sign in" onPress={() => props.navigation.navigate('Login')} />
      <Button title="Sign up" onPress={() => props.navigation.navigate('Signup')} />
      <Button title="ForgotPass" onPress={() => props.navigation.navigate('ForgotPass')} />
      <Button title="ResetPass" onPress={() => props.navigation.navigate('ResetPass')} />
      <Button
        title="Sign out"
        onPress={() => {
          dispatch({ type: 'SIGN_OUT' });
        }}
      />
    </View>
  );
};

export default HomeScreen;
