import React, { Component } from "react";
import { FlatList, View, Text, AsyncStorage } from "react-native";
import AlarmItem from "./AlarmItem";

class AlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: [
        {
          id: "1",
          title: "first"
        },
        {
          id: "2",
          title: "second"
        },
        {
          id: "3",
          title: "third"
        },
        {
          id: "4",
          title: "fourth"
        }
      ]
    };
  }

  toggleAlarm = alarm => {
    for (let i = 0; i < this.props.alarms.length; i++) {
      if (JSON.stringify(alarm) === JSON.stringify(this.props.alarms[i])) {
        this.props.toggleAlarm(alarm, i);
      }
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {!this.props.alarms ? (
          <Text style={{ textAlign: "center", color: "grey" }}>
            No alarms yet. Press the "+" button to add one!
          </Text>
        ) : (
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={this.props.alarms}
            renderItem={({ item }) => (
              <AlarmItem
                toggleAlarm={() => {
                  this.toggleAlarm(item);
                }}
                name={item.name}
                activated={item.activated}
                hr={item.hr}
                min={item.min}
                type={item.type}
                repeat={item.repeat}
              />
            )}
            keyExtractor={item => item.name + item.hr + item.min + item.type}
          />
        )}
      </View>
    );
  }
}

export default AlarmList;
