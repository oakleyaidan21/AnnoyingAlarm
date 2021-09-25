// @ts-ignore
import ReactNativeAN from 'react-native-alarm-notification';
import { create } from 'react-test-renderer';

/**
 * Creates a date-time for an alarm on the specified date
 * @param hours the hour the alarm goes off
 * @param minutes the minute the alarm goes off
 * @param amOrPM whether the alarm is for the AM or PM
 * @param date the date the alarm is on. If null then it's for the next possible time
 */
export const createAlarmDate = (
  hours: number,
  minutes: number,
  amOrPM: string,
  date?: Date,
) => {
  let alarmDate = date ? date : new Date();
  alarmDate.setHours(amOrPM === 'AM' ? hours : hours + 12);
  alarmDate.setMinutes(minutes);
  return alarmDate;
};

export const scheduleAlarm = async (
  hours: number,
  minutes: number,
  amOrPM: string,
) => {
  const d = createAlarmDate(hours, minutes, amOrPM);
  const fireDate = ReactNativeAN.parseDate(d);
  const alarmNotifData = {
    title: 'My Notification Title',
    message: 'My Notification Message',
    small_icon: 'ic_launcher',
    data: { foo: 'bar' },
  };
  const alarm = await ReactNativeAN.scheduleAlarm({
    ...alarmNotifData,
    fire_date: fireDate,
  });

  return d;
};
