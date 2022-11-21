import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import { useAuthenticationState } from '../state/authenticationContext';

function ForgotPass(props) {
  const [username, setUsername] = React.useState('');

  const auth = useAuthenticationState();

  const doForgot = async () => {
    await auth.doForgot({ username });
  };

  if (auth.userToken) props.navigation.navigate('Tabs');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Forgot Passowrd</Text>
      <Text>Insert username or email</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <Button title="Recover pass" onPress={() => doForgot()} />
    </View>
  );
}

export default ForgotPass;
