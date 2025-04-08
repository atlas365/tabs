import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ProgressTracker = ({ progress }) => {
  const xPosition = useSharedValue(0);

  React.useEffect(() => {
    xPosition.value = withTiming(progress * 33 - 8, { duration: 300 });
  }, [progress]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xPosition.value }],
    };
  });


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.statusText}>Amazing</Text>
      </View>
      <View style={styles.progressContainer}>
        {Array.from({ length: 8 }).map((_, i) => (
          <>
            <View
              style={progress < i ? styles.square : styles.circleComplete}
            ></View>
            {i <= 6 && (
              <View
                style={progress < i ? styles.line : styles.lineComplete}
              ></View>
            )}
          </>
        ))}
        <Animated.View style={[styles.circle, style]}>
          <Text style={styles.points}>{progress}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default ProgressTracker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 5,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffcf40",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  circleComplete: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffcf40",
  },
  line: {
    height: 1,
    width: 25,
    backgroundColor: "#ccc",
  },
  lineComplete: {
    height: 1,
    width: 25,
    backgroundColor: "#ffcf40",
  },
  points: {
    fontSize: 10,
  },
  square: {
    width: 8,
    height: 8,
    backgroundColor: "#ccc",
  },
  statusText: {
    fontWeight: "bold",
  },
});
