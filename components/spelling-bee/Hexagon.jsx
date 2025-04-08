import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Hexagon = ({ center, letter, onPress }) => {
  const barStyle = center ? styles.octagonBarCenter : styles.octagonBar;
  return (
    <TouchableOpacity style={styles.octagon} onPress={() => onPress(letter)}>
      <View style={[styles.octagonLeft, barStyle]} />
      <View style={[styles.octagonRight, barStyle]} />
      <View style={[styles.octagonUp, barStyle]}>
        <Text style={styles.letter}>{letter}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Hexagon;

const styles = StyleSheet.create({
  octagon: {
    marginVertical: 4,
  },
  letter: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  octagonBar: {
    width: 46,
    height: 80,
    backgroundColor: "#f1f1f1",
  },
  octagonBarCenter: {
    width: 46,
    height: 80,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#ffcf40",
  },
  octagonUp: {
    alignItems: "center",
    justifyContent: "center",
  },
  octagonLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "-60deg" }],
  },
  octagonRight: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ rotate: "60deg" }],
  },
});
