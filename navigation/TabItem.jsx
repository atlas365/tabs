import { Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { colors } from "../colors/colors";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const TabItem = ({ tabText, activeTab, onSetActiveTab, tabIcon }) => {
  const isActiveTab = activeTab === tabIcon;
  const animated = useSharedValue(isActiveTab ? 1 : 0);

  const color = colors[tabIcon].main;
  const bgColor = colors[tabIcon].light;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(animated.value, [0, 1], [25, 85], Extrapolation.CLAMP),
    };
  }, [activeTab, tabIcon]);

  const textStyle = useAnimatedStyle(() => {
    return {
      display: animated.value > 0.5 ? "flex" : "none",
      transform: [
        {
          scale: interpolate(
            animated.value,
            [0, 1],
            [0, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  }, [activeTab, tabIcon]);

  const onPress = (tab) => {
    onSetActiveTab(tab);
  };

  React.useEffect(() => {
    animated.value = withTiming(isActiveTab ? 1 : 0, undefined);
  }, [isActiveTab]);

  const bgColorStyle = isActiveTab && {
    backgroundColor: bgColor,
  };

  return (
    <Animated.View style={[styles.itemWrapper, animatedStyles]}>
      <Pressable
        style={[styles.tabItem, bgColorStyle]}
        onPress={() => onPress(tabIcon)}
      >
        <Feather
          name={tabIcon}
          size={20}
          color={isActiveTab ? color : "#000"}
        />
        <Animated.Text style={[styles.tabText, textStyle, { color }]}>
          {tabText}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 24,
  },
  tabText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "bold",
  },
  itemWrapper: {
    marginHorizontal: 24,
  },
});
