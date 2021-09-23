import React, { useState } from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  Colors,
  SegmentedControl,
} from 'react-native-ui-lib';
import { transformHand } from '../utils/DatePickerUtils';

type DateTimePickerProps = {
  onHourChange: any;
  onMinuteChange: any;
  hour: number;
  minute: number;
  amOrPM: string;
  onAMPMChange: any;
};

const hours = [7, 8, 9, 10, 11, 12];
const minutes = [30, 35, 40, 45, 50, 55];
const outerRadius = 160;
const innerRadius = 130;

let layoutAnimation = { ...LayoutAnimation.Presets.easeInEaseOut };
layoutAnimation.duration = 200;

const DateTimePicker = (props: DateTimePickerProps) => {
  const { onHourChange, onMinuteChange, hour, minute, amOrPM, onAMPMChange } =
    props;

  const [showMinutes, setShowMinutes] = useState<boolean>(false);
  const [showAMPM, setShowAMPM] = useState<boolean>(false);

  const handleHourPress = (h: number) => {
    onHourChange(h);
    LayoutAnimation.configureNext(layoutAnimation);
    setShowMinutes(true);
  };

  const handleMinutePress = (m: number) => {
    onMinuteChange(m);
    LayoutAnimation.configureNext(layoutAnimation);
    setShowMinutes(false);
    setShowAMPM(true);
  };

  const handleAMPMSelection = (index: number) => {
    onAMPMChange(index === 0 ? 'AM' : 'PM');
  };

  return (
    <View center>
      <View row style={{ marginBottom: 30 }}>
        <Text
          style={{ fontWeight: 'bold', fontSize: 40 }}
          color={showMinutes || showAMPM ? Colors.primaryText : Colors.primary}>
          {hour < 10 ? '0' + hour : hour}:
        </Text>
        <Text
          style={{ fontWeight: 'bold', fontSize: 40 }}
          color={showMinutes ? Colors.primary : Colors.primaryText}>
          {minute < 10 ? '0' + minute : minute}
        </Text>
        <Text
          style={{ fontWeight: 'bold', fontSize: 40 }}
          color={showAMPM ? Colors.primary : Colors.primaryText}>
          {amOrPM}
        </Text>
      </View>
      {/* OUTER RADIUS */}
      <View radius={180} backgroundColor={'lightgrey'} center>
        {/* INNER RADIUS */}
        <View radius={130} backgroundColor={Colors.primary} center>
          {!showAMPM ? (
            <>
              <View radius={5} backgroundColor={'white'} />

              <View
                style={{
                  ...s.clockHand,
                  transform: transformHand(showMinutes ? minute / 5 : hour),
                }}>
                <View flex backgroundColor={'white'} />
                <View flex backgroundColor={'transparent'} />
              </View>
            </>
          ) : (
            <SegmentedControl
              segments={[{ label: 'AM' }, { label: 'PM' }]}
              onChangeIndex={handleAMPMSelection}
            />
          )}
        </View>
        {/* NUMBERS */}

        {showMinutes
          ? minutes.map((m, index) => {
              const oppositeMinute = m - 30;
              return (
                <View
                  key={m}
                  style={{
                    position: 'absolute',
                    height: outerRadius * 2 + 30,
                    transform: transformHand(index + 6),
                  }}>
                  <View flex style={{ justifyContent: 'space-between' }}>
                    <TouchableOpacity
                      style={{
                        transform: [
                          { rotate: ((index - 6) % 12) * -30 + 'deg' },
                        ],
                      }}
                      onPress={() => handleMinutePress(m)}>
                      <View
                        radius={20}
                        backgroundColor={m === minute ? 'white' : 'transparent'}
                        center>
                        <Text>{m}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        transform: [
                          { rotate: (index % 12) * -30 + 180 + 'deg' },
                        ],
                      }}
                      onPress={() => handleMinutePress(oppositeMinute)}>
                      <View
                        radius={20}
                        backgroundColor={
                          oppositeMinute === minute ? 'white' : 'transparent'
                        }
                        center>
                        <Text>{oppositeMinute}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          : !showAMPM
          ? hours.map(h => {
              const oppositeHour = h - 6;
              return (
                <View
                  key={h}
                  style={{
                    position: 'absolute',
                    height: outerRadius * 2 + 30,
                    transform: transformHand(h),
                  }}>
                  <View flex style={{ justifyContent: 'space-between' }}>
                    <TouchableOpacity
                      style={{
                        transform: [{ rotate: (h % 12) * -30 + 'deg' }],
                      }}
                      onPress={() => handleHourPress(h)}>
                      <View
                        radius={20}
                        backgroundColor={h === hour ? 'white' : 'transparent'}
                        center>
                        <Text>{h}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        transform: [
                          { rotate: (oppositeHour % 12) * -30 + 180 + 'deg' },
                        ],
                      }}
                      onPress={() => handleHourPress(oppositeHour)}>
                      <View
                        radius={20}
                        backgroundColor={
                          oppositeHour === hour ? 'white' : 'transparent'
                        }
                        center>
                        <Text>{oppositeHour}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          : null}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  clockHand: {
    width: 5,
    height: innerRadius * 2 + 10,
    position: 'absolute',
  },
});

export default DateTimePicker;
