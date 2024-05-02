import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Details from '../screens/details/Details';
import {STACK_NAVIGATION_PROPERTIES} from '../utils/constants';
import HomeDrawer from './HomeDrawer';
import {hideToast, showToast} from '../data/redux/modules/toast/actions';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
        } else {
          dispatch(
            showToast({
              isError: true,
              toastMessage: 'Google Fit Access Denied',
            }),
          );
          setTimeout(() => {
            dispatch(hideToast());
          }, 2000);
        }
      })
      .catch(() => {
        dispatch(
          showToast({isError: true, toastMessage: 'Google Fit Access Error'}),
        );
        setTimeout(() => {
          dispatch(hideToast());
        }, 2000);
      });
  }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName="HomeDrawer">
      <Stack.Screen
        name="HomeDrawer"
        component={HomeDrawer}
        options={STACK_NAVIGATION_PROPERTIES}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={STACK_NAVIGATION_PROPERTIES}
      />
    </Stack.Navigator>
  );
}
