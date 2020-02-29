import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
class CreateAlarmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimePicker: false,
      pickedMin: "0",
      pickedHr: "0"
    };
  }
  render() {
    return (
      <View style={styles.settingsBox}>
        <Button
          onPress={() => {
            this.setState({ showTimePicker: true });
          }}
          title="pick Time"
          color="orange"
        />
        <DateTimePicker
          isVisible={this.state.showTimePicker}
          mode="time"
          onConfirm={date => {
            this.setState({
              pickedMin: date.getMinutes(),
              pickedHR: date.getHours(),
              showTimePicker: false
            });
          }}
          onCancel={() => {
            this.setState({ showTimePicker: false });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  settingsBox: {
    width: "95%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 5
  }
});

export default CreateAlarmModal;
