import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  AsyncStorage,
  ActivityIndicator,
  Text
} from "react-native";
import { Header, Icon } from "react-native-elements";
import AlarmList from "../components/AlarmList";
import CreateAlarmModal from "../components/CreateAlarmModal";
import Modal, {
  ModalContent,
  ModalTitle,
  SlideAnimation
} from "react-native-modals";

class AlarmListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateAlarmModal: false,
      alarms: null,
      loading: true
    };
  }

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

  render() {
    console.log("alarms:", this.state.alarms);
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
            <AlarmList alarms={JSON.parse(this.state.alarms)} />
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
