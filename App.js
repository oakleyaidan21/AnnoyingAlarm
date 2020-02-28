import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Header } from "react-native-elements";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        containerStyle={{ backgroundColor: "#ededed" }}
        centerComponent={{
          text: "ALARMS",
          style: { color: "orange" }
        }}
        rightComponent={{ icon: "add", color: "orange" }}
      />
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          {/* Where the alarms will go */}
        </ScrollView>
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
