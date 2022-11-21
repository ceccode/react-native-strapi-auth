import * as React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import { useAuthenticationState } from '../state/authenticationContext';

function Profile(props) {
  const auth = useAuthenticationState();

  const [username, setUsername] = React.useState(auth.user.username);
  const [name, setName] = React.useState(auth.user.name);
  const [company, setCompany] = React.useState(auth.user.Company);
  const [phone, setPhone] = React.useState(auth.user.phone);
  const [taxcode, setTaxcode] = React.useState(auth.user.Taxcode);

  const updateUser = async () => {
    const userId = auth.user.id;
    const token = auth.userToken;
    const userData = { username, name, company, phone, taxcode };
    await auth.updateUser({ userId, token, userData });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Update profile</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Company" value={company} onChangeText={setCompany} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="TaxCode" value={taxcode} onChangeText={setTaxcode} />

      <Button title="Update" onPress={() => updateUser()} />
    </View>
  );
}

export default Profile;
