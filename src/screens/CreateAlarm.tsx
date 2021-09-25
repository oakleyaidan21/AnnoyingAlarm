import React, { useState } from 'react';
import { Alert, LayoutAnimation } from 'react-native';
import { Button, FloatingButton, Text, View } from 'react-native-ui-lib';
import DateTimePicker from '../components/DateTimePicker';
import { scheduleAlarmNotification } from '../utils/AlarmUtils';
import {
  getHoursAndMinutesBetweenTimes,
  getNearestMultipleOfFive,
} from '../utils/DateTimeUtils';

const CreateAlarm = () => {
  const [hours, setHours] = useState<number>(new Date().getHours() % 12);
  const [minutes, setMinutes] = useState<number>(
    getNearestMultipleOfFive(new Date().getMinutes()),
  );
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);

  const [amOrPM, setAMorPM] = useState<string>(
    new Date().getHours() >= 12 ? 'PM' : 'AM',
  );

  const submitAlarm = () => {
    const alarmDate = scheduleAlarmNotification(hours, minutes, amOrPM, false);
    const diff = getHoursAndMinutesBetweenTimes(new Date(), alarmDate);
    Alert.alert(
      'Scheduled alarm for ' +
        diff.hours +
        ' hour(s) and ' +
        diff.minutes +
        ' minutes from now',
    );
    // .then((time: Date) => {
    //   Alert.alert('alarm created!' + time.toLocaleTimeString());
    // })
  };

  return (
    <View flex paddingd center>
      <DateTimePicker
        onHourChange={setHours}
        hour={hours}
        minute={minutes}
        onMinuteChange={(m: number) => {
          setMinutes(m);
          setShowSubmitButton(true);
        }}
        amOrPM={amOrPM}
        onAMPMChange={(res: string) => {
          setAMorPM(res);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }}
      />
      <FloatingButton
        visible={showSubmitButton}
        button={{
          label: 'Set Alarm',
          labelStyle: { color: 'white' },
          onPress: submitAlarm,
        }}
      />
    </View>
  );
};

export default CreateAlarm;
