import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "./colors/colors";
import SpellingBee from "./components/spelling-bee/SpellingBee";
import TabBar from "./navigation/TabBar";
import { Text } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Ticker from "./components/ticker/ticker";
import SkiaPlayground from "./components/skia/SkiaPlayground";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [activeTab, setActiveTab] = React.useState("user");
  const backgroundColor = colors[activeTab].main;

  const opacity = useSharedValue(0);
  const opacityStyles = useAnimatedStyle(() => {
    //if (opacity.value === 0) return { opacity: 0 };
    return {
      top: interpolate(opacity.value, [0, 1], [500, 450]),
      left: interpolate(opacity.value, [0, 1], [200, 205]),
      transform: [
        { scale: interpolate(opacity.value, [0, 0.5, 1], [1, 1.5, 1]) },
        { rotate: `${interpolate(opacity.value, [0, 1], [0, 90])}deg` },
      ],
    };
  });

  const onAnimate = () => {
    opacity.value = withTiming(
      1,
      {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      },
      () => {
        opacity.value = 0;
      }
    );
  };

  const onPress = (tab) => {
    setActiveTab(tab);
  };
  return (
    
    <View style={[styles.container]}>
      {activeTab === "home" && <SpellingBee />}
      {activeTab === "heart" && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 20,
            flex: 1,
          }}
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 500,
                left: 200,
                height: 4,
                width: 4,
                backgroundColor: "red",
              },
              opacityStyles,
            ]}
          ></Animated.View>

          <Pressable
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 15,
              backgroundColor: "pink",
            }}
            onPress={() => onAnimate()}
          >
            <Text>Animate</Text>
          </Pressable>
        </View>
      )}

      {activeTab === "search" && <Ticker />}

      {activeTab === "user" && <SkiaPlayground />}

      <TabBar onPress={onPress} activeTab={activeTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
