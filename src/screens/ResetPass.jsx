import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import { useAuthenticationState } from '../state/authenticationContext';

function ForgotPwd(props) {
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [code, setCode] = React.useState('');

  const auth = useAuthenticationState();

  const doResetPassword = async () => {
    await auth.resetPass({ password, passwordConfirmation, code });
  };

  if (auth.userToken) props.navigation.navigate('Tabs');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Reset Passowrd</Text>
      <Text>insert new password and reset code</Text>
      <TextInput placeholder="password" value={password} onChangeText={setPassword} />
      <TextInput
        placeholder="passwordConfirmation"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />
      <TextInput placeholder="code" value={code} onChangeText={setCode} />
      <Button title="Recover pass" onPress={() => doResetPassword()} />
    </View>
  );
}

export default ForgotPwd;
