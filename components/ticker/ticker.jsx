import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const height = 40;
const width = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
  },
  viewport: {
    minWidth: width,
    height: height,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    overflow: "hidden",
  },
  viewport2: {
    minWidth: width,
    height: height,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    //overflow: "hidden",
  },
  bottom: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    flexDirection: "row",
    gap: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
    width: 100,
  },
  number: {
    height: height,
    minWidth: width,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "lightblue",
  },
  list: {
    height: height * 2,
    minWidth: width,
  },
});

const Ticker = () => {
  const scrollAnimation = useSharedValue(0);

  const [currentValue, setCurrentValue] = React.useState(0);
  const [nextValue, setNextValue] = React.useState(0);

  const [trigger, setTrigger] = React.useState(0);
  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollAnimation.value }],
    };
  });

  const currentVal = React.useRef();
  const debounceRef = React.useRef();
  React.useEffect(() => {
    if (currentVal.current === undefined) {
      currentVal.current = trigger;
      return;
    }
    // increase
    if (trigger > currentVal.current) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      currentVal.current = trigger;
      setNextValue(trigger);
      scrollAnimation.value = withTiming(-height, { duration: 150 });
      debounceRef.current = setTimeout(() => {
        setCurrentValue(trigger);
        scrollAnimation.value = 0;
      }, 150);
      return;
    }
    if (trigger < currentVal.current) {
      currentVal.current = trigger;
      setCurrentValue(trigger);
      return;
    }
  }, [trigger]);

  const onIncrease = () => {
    setTrigger(currentVal.current + 1);
  };

  const onPressDown = () => {
    setTrigger(currentVal.current - 1);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.viewport}>
          <Animated.View style={[styles.list, scrollStyle]}>
            <View style={styles.number}>
              <Text>{currentValue}</Text>
            </View>
            <View style={styles.number}>
              <Text>{nextValue}</Text>
            </View>
          </Animated.View>
        </View>
        <View style={styles.viewport2}>
          <Animated.View style={[styles.list, scrollStyle]}>
            <View style={styles.number}>
              <Text>{currentValue}</Text>
            </View>
            <View style={styles.number}>
              <Text>{nextValue}</Text>
            </View>
          </Animated.View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Pressable style={styles.button} onPress={onIncrease}>
          <Text>Up</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onPressDown}>
          <Text>Down</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Ticker;
