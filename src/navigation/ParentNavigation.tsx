import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/splash/SplashScreen';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import {
  ParentNavigationRef,
  STACK_NAVIGATION_PROPERTIES,
} from '../utils/constants';
import {asyncStorageObject} from '../data/asyncStorage/AsyncStorage';
import {STORAGE_KEYS} from '../utils/enums';

const Stack = createStackNavigator();

export default function ParentNavigation() {
  useEffect(() => {
    asyncStorageObject.getData(STORAGE_KEYS.TOKEN).then(res => {
      if (res) {
        ParentNavigationRef.reset({
          index: 0,
          routes: [{name: 'AppNavigation'}],
        });
      } else {
        ParentNavigationRef.reset({
          index: 0,
          routes: [{name: 'AuthNavigation'}],
        });
      }
    });
  }, []);

  return (
    <NavigationContainer ref={ParentNavigationRef}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={STACK_NAVIGATION_PROPERTIES}
        />
        <Stack.Screen
          name="AppNavigation"
          component={AppNavigation}
          options={STACK_NAVIGATION_PROPERTIES}
        />
        <Stack.Screen
          name="AuthNavigation"
          component={AuthNavigation}
          options={STACK_NAVIGATION_PROPERTIES}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
