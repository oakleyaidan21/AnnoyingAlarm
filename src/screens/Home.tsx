import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import PushNotification, {
  PushNotificationScheduledLocalObject,
} from 'react-native-push-notification';
import { View } from 'react-native-ui-lib';
import AlarmItem from '../components/AlarmItem';

const Home = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [alarms, setAlarms] = useState<PushNotificationScheduledLocalObject[]>(
    [],
  );

  const onGetNotifications = (
    notifications: PushNotificationScheduledLocalObject[],
  ) => {
    setAlarms(notifications);
    setRefreshing(false);
  };

  const getNotifications = () => {
    PushNotification.getScheduledLocalNotifications(onGetNotifications);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View flex>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={alarms}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getNotifications();
            }}
          />
        }
        renderItem={({ item }) => {
          return <AlarmItem notificationData={item} />;
        }}
      />
    </View>
  );
};

export default Home;
