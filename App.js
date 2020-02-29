import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  AsyncStorage
} from "react-native";
import { Header, Icon } from "react-native-elements";
import AlarmList from "./components/AlarmList";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              //bring up alarm prompt

              //for now, just add shit to alarms storage
              //get alarms:
              let newAlarm = {
                title: "alarm",
                time: "9:30AM",
                type: "annoying"
              };
              try {
                let existingAlarms = await AsyncStorage.getItem("alarms");
                if (existingAlarms !== null) {
                  console.log("we have alarms");
                  let newAlarms = JSON.parse(existingAlarms);
                  if (!newAlarms) {
                    newAlarms = [];
                  }
                  newAlarms.push(newAlarm);
                  try {
                    console.log("setting alarms");
                    await AsyncStorage.setItem(
                      "alarms",
                      JSON.stringify(newAlarms)
                    );
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  try {
                    console.log("setting alarms");
                    let set = [];
                    set.push(newAlarm);
                    await AsyncStorage.setItem("alarms", JSON.stringify(set));
                  } catch (error) {
                    console.log(error);
                  }
                }
              } catch (error) {
                console.log(error);
              }
            }}
          />
        }
      />
      <View style={styles.container}>
        <AlarmList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
