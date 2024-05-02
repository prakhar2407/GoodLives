import {createNavigationContainerRef} from '@react-navigation/native';
import {Dimensions, Platform} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

// Check weather is android
export const isAndroid = Platform.OS === 'android';

// Check weather is iOS
export const isIOS = Platform.OS === 'ios';

export const ParentNavigationRef = createNavigationContainerRef();

export const STACK_NAVIGATION_PROPERTIES = {
  headerShown: false,
};
