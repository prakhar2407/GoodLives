/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  BackHandler,
  Alert,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {User} from '@react-native-google-signin/google-signin';
import FastImage from 'react-native-fast-image';
import {FONTS_FAMILY, FONTS_SIZE} from '../../utils/fonts';
import {COLORS} from '../../utils/colors';
import GoogleFit, {BucketUnit} from 'react-native-google-fit';
import {showToast} from '../../data/redux/modules/toast/actions';

interface StepsData {
  stepsTaken: number;
  healthPoints: number;
  currentDiscount: number;
}

export default function Home({navigation}: {navigation: any}) {
  const user: User = useSelector((root: any) => root.userReducer);
  const dispatch = useDispatch();
  const [stepsData, setStepsData] = useState<StepsData>({
    stepsTaken: 0,
    healthPoints: 0,
    currentDiscount: 0,
  });

  function onBackPress() {
    if (navigation.isFocused()) {
      Alert.alert('Hold on!', 'Are you sure you want to leave?', [
        {
          text: 'NO',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
    } else {
      return false;
    }
    return true;
  }

  useEffect(() => {
    GoogleFit.onAuthorize(() => {
      const opt = {
        startDate: '2017-01-01T00:00:17.971Z', // required ISO8601Timestamp
        endDate: new Date().toISOString(), // required ISO8601Timestamp
        bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1.
      };
      GoogleFit.getDailyStepCountSamples(opt)
        .then(res => {
          let totalSteps = 0;
          res[0].steps.forEach(item => {
            totalSteps += item.value;
          });
          setStepsData({
            stepsTaken: totalSteps,
            healthPoints: Math.floor(totalSteps / 1000),
            currentDiscount: 0,
          });
        })
        .catch(() => {
          dispatch(
            showToast({isError: true, toastMessage: 'Error Retrieving Steps'}),
          );
        });
    });

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {user?.user?.photo ? (
        <FastImage source={{uri: user?.user?.photo}} style={styles.photo} />
      ) : (
        <Pressable
          onPress={() => navigation.toggleDrawer()}
          style={styles.photoView}>
          <Text style={styles.photoViewText}>{user?.user?.name[0] || 'G'}</Text>
        </Pressable>
      )}

      <View style={styles.detailContainer}>
        <View style={{padding: 16}}>
          <Text style={styles.detailViewHeading}>
            Steps for next Policy Cycle
          </Text>
        </View>
        <View style={styles.dataView}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.dataText}>{stepsData.stepsTaken}</Text>
            <Text style={styles.dataText}>Steps</Text>
            <Text style={styles.dataText}>Taken</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.dataText}>{stepsData.healthPoints}</Text>
            <Text style={styles.dataText}>Health</Text>
            <Text style={styles.dataText}>Points</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.dataText}>{stepsData.currentDiscount}</Text>
            <Text style={styles.dataText}>Current</Text>
            <Text style={styles.dataText}>Discount</Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Details');
          }}
          style={styles.viewDetailsPressable}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  photo: {
    width: 50,
    height: 50,
  },
  photoView: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.Green,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Green,
  },
  photoViewText: {
    fontFamily: FONTS_FAMILY.Poppins_Medium,
    fontSize: FONTS_SIZE.ExtraExtraLarge,
    color: COLORS.White,
  },
  detailContainer: {
    backgroundColor: COLORS.Blue,
    borderRadius: 12,
    marginVertical: 16,
  },
  detailViewHeading: {
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    fontSize: FONTS_SIZE.Medium,
    color: COLORS.White,
  },
  dataView: {
    marginVertical: 12,
    flexDirection: 'row',
    gap: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataText: {
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    fontSize: FONTS_SIZE.Small,
    color: COLORS.White,
  },
  viewDetailsPressable: {
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: COLORS.Black,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  viewDetailsText: {
    color: COLORS.Yellow,
    textDecorationLine: 'underline',
    fontFamily: FONTS_FAMILY.Poppins_Regular,
    fontSize: FONTS_SIZE.Small,
  },
});
