// @ts-ignore
import ReactNativeAN from 'react-native-alarm-notification';

export const createAlarm = async (
  hours: number,
  minutes: number,
  amOrPM: string,
) => {
  const d = new Date();
  d.setHours(amOrPM === 'AM' ? hours : hours + 12);
  d.setMinutes(minutes);
  const fireDate = ReactNativeAN.parseDate(d);
  const alarmNotifData = {
    title: 'My Notification Title',
    message: 'My Notification Message',
    channel: 'my_channel_id',
    small_icon: 'ic_launcher',
    data: { foo: 'bar' },
  };

  const alarm = await ReactNativeAN.scheduleAlarm({
    ...alarmNotifData,
    fire_date: fireDate,
  });

  return d;
};
