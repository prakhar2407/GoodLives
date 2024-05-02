import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import {Google, Yoga} from '../../assets/svg/svg';
import {
  ParentNavigationRef,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../../utils/constants';
import {STRING} from '../../utils/strings';
import {FONTS_FAMILY, FONTS_SIZE} from '../../utils/fonts';
import {COLORS} from '../../utils/colors';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {useDispatch} from 'react-redux';
import {setUser} from '../../data/redux/modules/user/actions';
import {asyncStorageObject} from '../../data/asyncStorage/AsyncStorage';
import {STORAGE_KEYS} from '../../utils/enums';
import {hideToast, showToast} from '../../data/redux/modules/toast/actions';

export default function Login() {
  const dispatch = useDispatch();

  const googleSignin = useCallback(async () => {
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
      offlineAccess: false,
    });
    await GoogleSignin.hasPlayServices();
    const userInfo: User = await GoogleSignin.signIn();

    asyncStorageObject
      .storeData(STORAGE_KEYS.TOKEN, userInfo.idToken)
      .then(() => {
        dispatch(setUser(userInfo));
        ParentNavigationRef.reset({
          index: 0,
          routes: [{name: 'AppNavigation'}],
        });
      })
      .catch(() => {
        dispatch(
          showToast({isError: true, toastMessage: 'Something Went Wrong'}),
        );
        setTimeout(() => {
          dispatch(hideToast());
        }, 2000);
      });
  }, [dispatch]);

  function showSampleErr() {
    dispatch(showToast({isError: true, toastMessage: 'Sample Error'}));
    setTimeout(() => {
      dispatch(hideToast());
    }, 2000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.yogaView}>
        <Yoga width={WINDOW_WIDTH * 0.9} height={WINDOW_HEIGHT * 0.6} />
      </View>
      <View>
        <Text style={styles.welcomeText}>{STRING.WELCOME}</Text>
      </View>
      <View>
        <Text style={styles.aboutText}>{STRING.ABOUT_GOODLIVES}</Text>
      </View>
      <View style={styles.googlePressableView}>
        <Pressable onPress={googleSignin} style={styles.googlePressable}>
          <View>
            <Google width={18} height={18} />
          </View>
          <View>
            <Text style={styles.googleLoginText}>{STRING.GOOGLE_LOGIN}</Text>
          </View>
        </Pressable>
        <Pressable onPress={showSampleErr} style={styles.sampleErrPressable}>
          <View>
            <Text style={styles.sampleErrPressableText}>
              {STRING.SAMPLE_ERR}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  yogaView: {alignSelf: 'center'},
  welcomeText: {
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    color: COLORS.Green,
    fontSize: FONTS_SIZE.ExtraExtraLarge,
  },
  aboutText: {
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: COLORS.DarkGrey,
    fontSize: FONTS_SIZE.Large,
  },
  googlePressableView: {
    marginVertical: WINDOW_HEIGHT * 0.04,
  },
  googlePressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.Black,
    padding: 16,
    borderRadius: 32,
  },
  googleLoginText: {
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: COLORS.DarkGrey,
    fontSize: FONTS_SIZE.Large,
  },
  sampleErrPressable: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 8,
  },
  sampleErrPressableText: {
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    color: COLORS.DarkGrey,
    fontSize: FONTS_SIZE.ExtraExtraSmall,
    textDecorationLine: 'underline',
  },
});
