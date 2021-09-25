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
  alarmDate.setSeconds(0);
  // if the alarm would be before the current time, add a day
  if (alarmDate < new Date()) {
    alarmDate.setDate(alarmDate.getDate() + 1);
  }
  return alarmDate;
};
