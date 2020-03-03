import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Header, Icon } from "react-native-elements";
import AlarmList from "../components/AlarmList";
import CreateAlarmModal from "../components/CreateAlarmModal";
import Modal, {
  ModalContent,
  ModalTitle,
  SlideAnimation
} from "react-native-modals";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

class AlarmListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateAlarmModal: false,
      alarms: null,
      loading: true
    };
  }

  sendNotification = async () => {
    await Notifications.createChannelAndroidAsync("alarmTypes", {
      name: "annoyingAlarms",
      sound: true
    });
    let noti = {
      title: "alarm!",
      body: "this is a notification!",
      data: {
        yeet: "yeet"
      },
      android: {
        color: "orange",
        channelId: "alarmTypes"
      }
    };
    await Notifications.presentLocalNotificationAsync(noti);
  };

  getAlarms = async () => {
    try {
      let existingAlarms = await AsyncStorage.getItem("alarms");
      if (existingAlarms !== null) {
        this.setState({ alarms: existingAlarms });
        return true;
      }
    } catch (error) {
      console.log("error fetching alarms: ", error);
      return false;
    }
    return false;
  };

  componentDidMount = async () => {
    this.getAlarms().then(() => {
      this.setState({ loading: false });
    });

    //get permissions
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      console.log("not granted");
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    } else {
      console.log("granted");
    }
    this.sendNotification();
  };

  addAlarmToStorageAndView = async alarm => {
    //first, get the alarms
    let newAlarms = JSON.parse(this.state.alarms);
    if (!newAlarms) {
      newAlarms = [];
    }
    newAlarms.push(alarm);
    //reset old local storage with this
    try {
      await AsyncStorage.setItem("alarms", JSON.stringify(newAlarms));
    } catch (error) {
      console.log("error in adding to local storage", error);
    }
    //override current alarm list
    this.setState({ alarms: JSON.stringify(newAlarms) });
  };

  toggleAlarm = async (alarm, index) => {
    let newAlarms = JSON.parse(this.state.alarms);
    newAlarms[index].activated = !newAlarms[index].activated;
    //reset in local storage
    try {
      await AsyncStorage.setItem("alarms", JSON.stringify(newAlarms));
    } catch (error) {
      console.log("error in changing local storage", error);
    }
    //reset in state
    this.setState({ alarms: JSON.stringify(newAlarms) });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          modalTitle={<ModalTitle title="Create new Alarm" />}
          visible={this.state.showCreateAlarmModal}
          onTouchOutside={() => {
            this.setState({ showCreateAlarmModal: false });
          }}
          modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        >
          <ModalContent>
            <CreateAlarmModal
              clearModal={() => {
                this.setState({ showCreateAlarmModal: false });
              }}
              addAlarm={alarm => {
                this.addAlarmToStorageAndView(alarm);
              }}
            />
          </ModalContent>
        </Modal>
        <Header
          containerStyle={{ backgroundColor: "#ededed" }}
          centerComponent={{
            text: "ALARMS",
            style: { color: "orange" }
          }}
          rightComponent={
            <Icon
              name="add"
              color="orange"
              onPress={async () => {
                this.setState({ showCreateAlarmModal: true });
              }}
              disabled={this.state.loading}
            />
          }
        />
        <View style={styles.container}>
          {!this.state.loading ? (
            <AlarmList
              alarms={JSON.parse(this.state.alarms)}
              toggleAlarm={(alarm, index) => {
                this.toggleAlarm(alarm, index);
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AlarmListView;
