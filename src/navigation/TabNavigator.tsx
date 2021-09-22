import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import CreateAlarm from '../screens/CreateAlarm';
import { getTabBarIconName } from '../utils/TabBarUtils';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Colors } from 'react-native-ui-lib';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const iconName = getTabBarIconName(route.name);
          return (
            <Icon
              name={iconName}
              color={focused ? Colors.focusedIcon : Colors.unfocusedIcon}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={CreateAlarm} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
