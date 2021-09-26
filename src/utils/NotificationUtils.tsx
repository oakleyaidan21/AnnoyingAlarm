import PushNotification, { Importance } from 'react-native-push-notification';
import { createAlarmDate } from './AlarmUtils';

/**
 * Creates a local notification for an alarm
 * @param hours the hour the alarm goes off
 * @param minutes the minute the alarm goes off
 * @param amOrPM whether the alarm is for the AM or PM
 * @param repeats whether to repeat this alarm every day
 * @returns the date of the alarm
 */
export const scheduleAlarmNotification = (
  hours: number,
  minutes: number,
  amOrPM: string,
  repeats: boolean,
) => {
  const d = createAlarmDate(hours, minutes, amOrPM);

  PushNotification.localNotificationSchedule({
    message: 'Alarm!',
    date: d,
    allowWhileIdle: true,
    repeatType: repeats ? 'day' : undefined,
    channelId: 'alarm',
  });

  return d;
};

/**
 * Creates the channel for sending notifications on android
 */
export const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'alarm',
      channelName: 'Alarms',
      channelDescription: 'A channel for alarms',
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
