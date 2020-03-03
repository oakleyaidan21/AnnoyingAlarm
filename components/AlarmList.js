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
      <View style={{ flex: 1, width: "100%" }}>
        {!this.props.alarms ? (
          <Text>No alarms</Text>
        ) : (
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={this.props.alarms}
            renderItem={({ item }) => (
              <AlarmItem
                toggleAlarm={() => {
                  this.toggleAlarm(item);
                }}
                title={item.name}
                id={item.id}
                activated={item.activated}
                hr={item.hr}
                min={item.min}
                type={item.type}
                repeat={item.repeat}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

export default AlarmList;
