import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from '../screens/Profile';
import TabScreen1 from '../screens/Tab1';
import TabScreen2 from '../screens/Tab2';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={TabScreen1} />
      <Tab.Screen name="Tab2" component={TabScreen2} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
