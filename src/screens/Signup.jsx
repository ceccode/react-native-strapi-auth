import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import { useAuthenticationState, useAuthenticationDispatch } from '../state/authenticationContext';

function Signup(props) {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [taxcode, setTaxcode] = React.useState('');

  const auth = useAuthenticationState();
  const dispatch = useAuthenticationDispatch();

  React.useEffect(() => {
    if (auth.userToken) {
      dispatch({ type: 'SIGN_OUT' });
    }
  }, []);

  const doSignup = async () => {
    await auth.signUp({ username, password, name, email, company, phone, taxcode });
    props.navigation.navigate('Tabs');
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign Up</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Company" value={company} onChangeText={setCompany} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="TaxCode" value={taxcode} onChangeText={setTaxcode} />
      <Button title="Sign in" onPress={() => doSignup()} />
    </View>
  );
}

export default Signup;
