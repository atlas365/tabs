import { StyleSheet, View } from "react-native";
import React from "react";
import TabItem from "./TabItem";

const tabs = [
  { icon: "home", text: "Bee" },
  { icon: "heart", text: "Likes" },
  { icon: "search", text: "Search" },
  { icon: "user", text: "User" },
];

const TabBar = ({ onPress, activeTab }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.navBar}>
        {tabs.map((tab) => (
          <TabItem
            key={tab.icon}
            activeTab={activeTab}
            tabIcon={tab.icon}
            tabText={tab.text}
            onSetActiveTab={onPress}
          />
        ))}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
  navBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 24,
    paddingBottom: 36,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});
