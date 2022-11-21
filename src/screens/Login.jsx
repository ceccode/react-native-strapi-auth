import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import { useAuthenticationState } from '../state/authenticationContext';

function Login(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const auth = useAuthenticationState();

  const doLogin = async () => {
    await auth.signIn({ username, password });
  };

  if (auth.userToken) props.navigation.navigate('Tabs');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => doLogin()} />
    </View>
  );
}

export default Login;
