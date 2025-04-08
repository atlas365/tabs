import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedAnswerDrawer from "./AnswerDrawerExtended";

const AnswerDrawer = ({ correctWords }) => {
  const [open, setOpen] = React.useState(false);
  const height = useSharedValue(40);
  const heightStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const toggleDrawer = React.useCallback(() => {
    if (open) {
      height.value = withTiming(40, { duration: 100 });
      setOpen(false);
    } else {
      height.value = withTiming(400, { duration: 100 });
      setOpen(true);
    }
  }, [open, setOpen]);

  return (
    <Animated.View style={[styles.drawer, heightStyle]}>
      <View style={styles.topRow}>
        <View style={styles.correctWords}>
          {correctWords.map((word, index) => (
            <Text key={index}>{word[0] + word.slice(1).toLowerCase()}</Text>
          ))}
        </View>
        <LinearGradient
          // Background Linear Gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["rgba(255, 255, 255, 0)", "#fff"]}
          style={styles.background}
        />
        <TouchableOpacity>
          <Feather
            name={`chevron-${open ? "up" : "down"}`}
            size={20}
            color="#555"
            onPress={toggleDrawer}
          />
        </TouchableOpacity>
      </View>
      {open && <AnimatedAnswerDrawer correctWords={correctWords} />}
    </Animated.View>
  );
};

export default AnswerDrawer;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    right: 20,
    top: 0,
    height: 30,
    width: 50,
  },
  drawer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  correctWords: {
    flexDirection: "row",
    gap: 5,
    flex: 1,
    overflow: "hidden",
    marginRight: 10,
  },
  linearGradient: {
    width: 30,
    height: 40,
  },
  topRow: {
    flexDirection: "row",
    justifyContenta: "space-between",
    height: 40,
    alignItems: "center",
    alignSelf: "flex-start",
  },
});
