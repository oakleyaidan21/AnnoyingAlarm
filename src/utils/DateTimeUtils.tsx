export const getNearestMultipleOfFive = (x: number) => {
  return Math.ceil(x / 5) * 5;
};

export const getHoursAndMinutesBetweenTimes = (date1: Date, date2: Date) => {
  const millisecondsBetween = date2.valueOf() - date1.valueOf();
  const hours = Math.floor((millisecondsBetween % 86400000) / 3600000);
  const minutes = Math.floor((millisecondsBetween % 3600000) / 60000);
  return { hours: hours, minutes: minutes };
};
