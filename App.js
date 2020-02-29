import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert
} from "react-native";
import { Header, Icon } from "react-native-elements";
import AlarmItem from "./components/AlarmItem";

const DATA = [
  // {
  //   id: "1",
  //   title: "first"
  // },
  // {
  //   id: "2",
  //   title: "second"
  // },
  // {
  //   id: "3",
  //   title: "third"
  // },
  // {
  //   id: "4",
  //   title: "fourth"
  // }
];

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
            onPress={() => {
              Alert.alert("pressed");
            }}
          />
        }
      />
      <View style={styles.container}>
        {DATA.length === 0 ? (
          <Text>No alarms. Press '+' in the top right to create one!</Text>
        ) : (
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={DATA}
            renderItem={({ item }) => (
              <AlarmItem title={item.title} id={item.id} />
            )}
            keyExtractor={item => item.id}
          />
        )}
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
