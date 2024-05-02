import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FONTS_FAMILY, FONTS_SIZE} from '../utils/fonts';
import {COLORS} from '../utils/colors';
import {asyncStorageObject} from '../data/asyncStorage/AsyncStorage';
import {STORAGE_KEYS} from '../utils/enums';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ParentNavigationRef} from '../utils/constants';

export const DrawerContent = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          asyncStorageObject.removeData(STORAGE_KEYS.TOKEN);
          await GoogleSignin.signOut();
          ParentNavigationRef.reset({
            index: 0,
            routes: [{name: 'AuthNavigation'}],
          });
        }}>
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    fontSize: FONTS_SIZE.Medium,
    color: COLORS.Black,
  },
});
