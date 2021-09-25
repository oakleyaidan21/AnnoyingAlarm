import React from 'react';
import { Icon } from 'react-native-elements';
import { PushNotificationScheduledLocalObject } from 'react-native-push-notification';
import { Card, Colors, Text, View } from 'react-native-ui-lib';

type AlarmItemProps = {
  notificationData: PushNotificationScheduledLocalObject;
};

const AlarmItem = (props: AlarmItemProps) => {
  const { message } = props.notificationData;

  return (
    <Card style={{ marginTop: 10, overflow: 'hidden' }} row>
      <View style={{ flex: 1 }} center>
        <Icon name="alarm" size={50} color={Colors.primary} />
      </View>
      <View style={{ flex: 3, padding: 10 }} centerV>
        <Text>{message}</Text>
      </View>
    </Card>
  );
};

export default AlarmItem;
