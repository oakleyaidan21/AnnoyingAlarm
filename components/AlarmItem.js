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
        <View style={styles.icon}>
          <Image
            style={{ flex: 1 }}
            source={{
              uri: "https://image.flaticon.com/icons/png/512/62/62834.png"
            }}
          />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.details}>
            <Text>{this.props.title}</Text>
          </View>
          <View style={styles.settings}>
            <Switch />
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
  icon: {
    flex: 1
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
