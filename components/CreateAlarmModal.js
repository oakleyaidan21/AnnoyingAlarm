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
      repeat: false,
      timePicked: false
    };
  }

  render() {
    return (
      <View style={styles.settingsBox}>
        <Text style={styles.time}>
          {this.state.pickedHr}:
          {this.state.pickedMin < 10
            ? "0" + this.state.pickedMin
            : this.state.pickedMin}
        </Text>
        <Button
          onPress={() => {
            this.setState({ showTimePicker: true });
          }}
          title="pick Time"
          color="orange"
        />
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>Enter a Name:</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Untitled"
            onChangeText={text => {
              this.setState({ alarmName: text });
            }}
            maxLength={8}
          />
        </View>
        <DateTimePicker
          isVisible={this.state.showTimePicker}
          mode="time"
          onConfirm={date => {
            this.setState({
              pickedMin: date.getMinutes(),
              pickedHr: date.getHours(),
              showTimePicker: false,
              timePicked: true
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
            { value: "Puzzle" },
            { value: "Custom" }
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
          <Text>Repeats?</Text>
          <CheckBox
            value={this.state.repeat}
            disabled={false}
            onChange={() => {
              this.setState({ repeat: !this.state.repeat });
            }}
            tintColors={{ true: "orange", false: "grey" }}
          />
        </View>
        <Button
          title="SUBMIT"
          color="orange"
          disabled={
            !(
              this.state.alarmName.length !== 0 &&
              this.state.alarmType.length !== 0 &&
              this.state.timePicked
            )
          }
          onPress={() => {
            //add new alarm to local storage with params and add it to view
            let newAlarm = {
              name: this.state.alarmName,
              hr: this.state.pickedHr,
              min: this.state.pickedMin,
              type: this.state.alarmType,
              repeat: this.state.repeat,
              activated: false
            };
            this.props.addAlarm(newAlarm);
            //clear modal
            this.props.clearModal();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsBox: {
    backgroundColor: "white",
    borderRadius: 5
  },
  nameInput: {
    backgroundColor: "rgb(230,230,230)",
    width: 200,
    marginLeft: 10,
    borderRadius: 5,
    padding: 5
  },
  time: {
    textAlign: "center",
    margin: 10,
    fontSize: 40,
    fontWeight: "bold"
  }
});

export default CreateAlarmModal;
