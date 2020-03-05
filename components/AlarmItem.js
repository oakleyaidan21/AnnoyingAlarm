import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Switch
} from "react-native";
class AlarmItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.name}>{this.props.name}</Text>
          <View style={styles.bar}></View>
          <Text style={styles.time}>
            {this.props.hr}:
            {this.props.min < 10 ? "0" + this.props.min : this.props.min}
          </Text>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.details}>
            <Text>{this.props.type}</Text>
            <Text>{this.props.repeat ? "Repeats" : ""}</Text>
          </View>
          <View style={styles.settings}>
            <Switch
              value={this.props.activated}
              thumbColor={"orange"}
              trackColor={{ false: "grey", true: "orange" }}
              ios_backgroundColor={"orange"}
              onChange={() => {
                this.props.toggleAlarm();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    backgroundColor: "rgb(200,200,200)",
    margin: 6,
    flexDirection: "row"
  },
  left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold"
  },
  bar: {
    width: "95%",
    height: 2,
    backgroundColor: "black"
  },
  time: {
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center"
  },
  rightSide: {
    flex: 1
  },
  details: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center"
  },
  settings: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AlarmItem;
