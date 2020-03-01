import React, { Component } from "react";
import { View, StyleSheet, Button, TextInput, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from "react-native-material-dropdown";
import CheckBox from "@react-native-community/checkbox";
class CreateAlarmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimePicker: false,
      pickedMin: "0",
      pickedHr: "0",
      alarmName: "",
      alarmType: "",
      repeat: false
    };
  }
  render() {
    return (
      <View style={styles.settingsBox}>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>Name this alarm:</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Untitled"
          ></TextInput>
        </View>
        <Button
          onPress={() => {
            this.setState({ showTimePicker: true });
          }}
          title="pick Time"
          color="orange"
        />
        <Text>
          Selected time: {this.state.pickedHr}:
          {this.state.pickedMin < 10
            ? "0" + this.state.pickedMin
            : this.state.pickedMin}
        </Text>
        <DateTimePicker
          isVisible={this.state.showTimePicker}
          mode="time"
          onConfirm={date => {
            this.setState({
              pickedMin: date.getMinutes(),
              pickedHr: date.getHours(),
              showTimePicker: false
            });
          }}
          onCancel={() => {
            this.setState({ showTimePicker: false });
          }}
        />
        <Dropdown
          label="Alarm Type"
          data={[
            { value: "Persistant" },
            { value: "Annoying" },
            { value: "Puzzle" }
          ]}
          onChangeText={text => {
            this.setState({ alarmType: text });
          }}
        />
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>Repeat every day?</Text>
          <CheckBox
            value={this.state.repeat}
            disabled={false}
            onChange={() => {
              this.setState({ repeat: !this.state.repeat });
            }}
          />
        </View>
        <Button
          title="SUBMIT"
          color="orange"
          onPress={() => {
            //check params

            //add new alarm to local storage with params

            //add it to view

            //clear modal
            this.props.clearModal();
          }}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsBox: {
    // width: "95%",
    // height: "80%",
    backgroundColor: "white",
    borderRadius: 5
  },
  nameInput: {
    backgroundColor: "rgb(230,230,230)",
    width: 200,
    marginLeft: 10,
    borderRadius: 5,
    padding: 5
  }
});

export default CreateAlarmModal;
