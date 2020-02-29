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

  _retrieveAlarms = async () => {
    try {
      const value = await AsyncStorage.getItem("alarms");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    //get alarms
    let alarms = await this._retrieveAlarms();
    console.log("alarms: ", alarms);
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        {this.state.alarms.length === 0 ? (
          <Text>no alarms</Text>
        ) : (
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={this.state.alarms}
            renderItem={({ item }) => (
              <AlarmItem title={item.title} id={item.id} />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

export default AlarmList;
