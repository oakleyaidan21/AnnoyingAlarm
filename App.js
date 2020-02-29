import React from "react";
import { StyleSheet, View, SafeAreaView, AsyncStorage } from "react-native";
import { Header, Icon } from "react-native-elements";
import AlarmList from "./components/AlarmList";
import CreateAlarmModal from "./components/CreateAlarmModal";
import AlarmListView from "./views/AlarmListView";

export default function App() {
  return <AlarmListView />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
