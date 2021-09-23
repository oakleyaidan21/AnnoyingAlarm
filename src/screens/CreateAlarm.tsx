import React, { useState } from 'react';
import { Alert, LayoutAnimation } from 'react-native';
import { Button, FloatingButton, Text, View } from 'react-native-ui-lib';
import DateTimePicker from '../components/DateTimePicker';
import { createAlarm } from '../utils/AlarmUtils';
import { getNearestMultipleOfFive } from '../utils/TimeUtils';

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
    createAlarm(hours, minutes, amOrPM)
      .then(() => {
        Alert.alert('alarm created!');
      })
      .catch(e => {
        Alert.alert('alarm failed:');
        console.log(e);
      });
  };

  return (
    <View flex paddingd center>
      <DateTimePicker
        onHourChange={setHours}
        hour={hours}
        minute={minutes}
        onMinuteChange={setMinutes}
        amOrPM={amOrPM}
        onAMPMChange={(res: string) => {
          setAMorPM(res);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShowSubmitButton(true);
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
