import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import PushNotification, {
  PushNotificationScheduledLocalObject,
} from 'react-native-push-notification';
import { View } from 'react-native-ui-lib';
import AlarmItem from '../components/AlarmItem';

const Home = () => {
  const [alarms, setAlarms] = useState<PushNotificationScheduledLocalObject[]>(
    [],
  );

  const getNotifications = (
    notifications: PushNotificationScheduledLocalObject[],
  ) => {
    setAlarms(notifications);
  };

  useEffect(() => {
    PushNotification.getScheduledLocalNotifications(getNotifications);
  }, []);

  return (
    <View flex>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={alarms}
        renderItem={({ item }) => {
          return <AlarmItem notificationData={item} />;
        }}
      />
    </View>
  );
};

export default Home;
