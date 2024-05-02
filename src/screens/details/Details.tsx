import {View, StyleSheet, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {WINDOW_WIDTH} from '../../utils/constants';
import {FONTS_FAMILY, FONTS_SIZE} from '../../utils/fonts';
import {COLORS} from '../../utils/colors';

export default function Details() {
  const [selectedTimeLine, setSelectedTimeLine] = useState<
    'DAILY' | 'MONTHLY' | 'YEARLY'
  >('MONTHLY');
  return (
    <View style={styles.container}>
      <View style={styles.timelineParentView}>
        <Pressable
          onPress={() => {
            setSelectedTimeLine('DAILY');
          }}
          style={[
            selectedTimeLine === 'DAILY'
              ? {backgroundColor: COLORS.Green}
              : undefined,
            styles.timelineView,
          ]}>
          <Text
            style={[
              styles.timeLineText,
              {
                color:
                  selectedTimeLine === 'DAILY' ? COLORS.White : COLORS.Black,
              },
            ]}>
            Daily
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedTimeLine('MONTHLY');
          }}
          style={[
            selectedTimeLine === 'MONTHLY'
              ? {backgroundColor: COLORS.Green}
              : undefined,
            styles.timelineView,
          ]}>
          <Text
            style={[
              styles.timeLineText,
              {
                color:
                  selectedTimeLine === 'MONTHLY' ? COLORS.White : COLORS.Black,
              },
            ]}>
            Monthly
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedTimeLine('YEARLY');
          }}
          style={[
            selectedTimeLine === 'YEARLY'
              ? {backgroundColor: COLORS.Green}
              : undefined,
            styles.timelineView,
          ]}>
          <Text
            style={[
              styles.timeLineText,
              {
                color:
                  selectedTimeLine === 'YEARLY' ? COLORS.White : COLORS.Black,
              },
            ]}>
            Yearly
          </Text>
        </Pressable>
      </View>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={WINDOW_WIDTH * 0.9}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientFrom: '#FFFFF',
          backgroundGradientTo: '#FFFF',
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional
        }}
        bezier
        style={styles.graph}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  graph: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 8,
  },
  timelineParentView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.LightGreenUpdate,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  timelineView: {
    flex: 0.33,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  timeLineText: {
    fontSize: FONTS_SIZE.Medium,
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
  },
});
