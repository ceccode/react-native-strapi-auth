import { Text, View, Button } from 'react-native';

import { useAuthenticationDispatch, useAuthenticationState } from '../state/authenticationContext';

const TabScreen1 = (props) => {
  const dispatch = useAuthenticationDispatch();
  const state = useAuthenticationState();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tab1 Scxreen</Text>
      <Text>Welcome {state.user && state.user.username}</Text>
      <Button title="Go to Home" onPress={() => props.navigation.navigate('Home')} />
      <Button
        title="SIGN OUT"
        onPress={() => {
          dispatch({ type: 'SIGN_OUT' });
          props.navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default TabScreen1;
