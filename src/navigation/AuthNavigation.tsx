import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import {STACK_NAVIGATION_PROPERTIES} from '../utils/constants';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName="Authentication">
      <Stack.Screen
        name="Authentication"
        component={Login}
        options={STACK_NAVIGATION_PROPERTIES}
      />
    </Stack.Navigator>
  );
}
