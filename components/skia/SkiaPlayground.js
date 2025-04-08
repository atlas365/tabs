import React from "react";
import {
  Canvas,
  Circle,
  Group,
  notifyChange,
  Path,
  Rect,
  Skia,
} from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withDecay } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const SkiaPlayground = () => {
  const currentPath1 = useSharedValue(Skia.Path.Make().moveTo(0, 0));
  const currentPath2 = useSharedValue(Skia.Path.Make().moveTo(0, 0));
  const [color, setColor] = React.useState(true);

  const translateX = useSharedValue(100);

  const translateY = useSharedValue(200);

  // const gesture = Gesture.Pan()
  //   .onChange((e) => {
  //     translateX.value += e.changeX;
  //     translateY.value += e.changeY;
  //   })
  //   .onEnd((e) => {
  //     translateX.value = withDecay({
  //       velocity: e.velocityX,
  //       clamp: [leftBoundary, rightBoundary],
  //     });
  //     translateY.value = withDecay({
  //       velocity: e.velocityY,
  //       clamp: [topBoundary, bottomBoundary],
  //     });
  //   });

  const onEnd1 = React.useCallback(() => {
    currentPath1.value.reset();
  }, [color]);

  const onEnd2 = React.useCallback(() => {
    setTimeout(() => {
      currentPath2.value.reset();
    }, 500);
  }, [color]);

  const pan1 = Gesture.Pan()
    .averageTouches(true)
    .maxPointers(1)
    .onBegin((e) => {
      currentPath1.value.moveTo(e.x, e.y);
      currentPath1.value.lineTo(e.x, e.y);
      notifyChange(currentPath1);
    })
    .onChange((e) => {
      currentPath1.value.lineTo(e.x, e.y);
      translateX.value += e.changeX;
      translateY.value += e.changeY;
      notifyChange(currentPath1);
    })
    .onEnd((e) => {
      runOnJS(onEnd1)();
    });

  const press = Gesture.Tap()
    .runOnJS()
    .onStart(() => {
      console.log("Double tap!");
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan1}>
        {/* <Canvas style={styles.container}>
          <Circle cx={translateX} cy={translateY} r={40} color="cyan" />
          <Path path={path} color="lightblue" />
        </Canvas> */}
        <Canvas style={styles.container} onTouch={(e) => console.log(e)}>
          <Circle cx={translateX} cy={translateY} r={20} color="blue" />
          {/* <Circle cx={200} cy={200} r={20} color="blue" />
          <Circle cx={300} cy={200} r={20} color="blue" />

          <Rect x={50} y={300} width={100} height={25} color="lightblue" />
          <Rect x={250} y={300} width={100} height={25} color="lightblue" />

          <Rect x={125} y={400} width={150} height={25} color="lightblue" />

          <Rect x={50} y={500} width={100} height={25} color="lightblue" />
          <Rect x={250} y={500} width={100} height={25} color="lightblue" />

          <Circle cx={100} cy={650} r={20} color="red" />
          <Circle cx={200} cy={650} r={20} color="red" /> */}
          {/* <Pressable onPress={() => console.log('1')}> */}
          <Circle cx={300} cy={650} r={20} color="red" />
          {/* </Pressable> */}
          <Path
            path={currentPath1}
            style="stroke"
            strokeWidth={5}
            strokeCap="round"
            strokeJoin="round"
            color={color ? "blue" : "red"}
          />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SkiaPlayground;
