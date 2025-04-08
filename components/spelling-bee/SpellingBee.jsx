import Hexagon from "./Hexagon";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import useLetters from "./hooks/useLetters";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import ProgressTracker from "./ProgressTracker";
import AnswerDrawer from "./AnswerDrawer";

const SpellingBee = () => {
  const { letters, mainLetter, shuffleLetters, checkWord } = useLetters();

  const [attempt, setAttempt] = React.useState([]);
  const [correctWords, setCorrectWords] = React.useState([]);
  const [step, setStep] = React.useState(0);

  const onLetterPress = (letter) => {
    setAttempt((prev) => [...prev, letter]);
  };

  const onDelete = () => {
    setAttempt((prev) => prev.slice(0, -1));
  };

  const opacity = useSharedValue(0);
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  React.useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 1000 }), 0, true);
  }, []);

  const shake = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const onCheck = () => {
    const word = attempt.join("");
    if (checkWord(word)) {
      setCorrectWords((prev) => [word, ...prev]);
      setAttempt([]);
      setStep(6);
    } else {
      shake.value = withRepeat(withTiming(10, { duration: 100 }), 4, true);
      setTimeout(() => {
        setAttempt([]);
      }, 450);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        {attempt.length === 0 && (
          <Animated.View style={[styles.cursor, opacityStyles]}></Animated.View>
        )}
        {attempt.length > 0 && (
          <Animated.View style={[styles.letters, shakeStyle]}>
            {attempt.map((letter, index) => (
              <Text
                key={index}
                style={
                  letter === mainLetter ? styles.mainLetter : styles.letter
                }
              >
                {letter}
              </Text>
            ))}
          </Animated.View>
        )}

        <View style={styles.tileContainer}>
          <View>
            <Hexagon onPress={onLetterPress} letter={letters[0]} />
            <Hexagon onPress={onLetterPress} letter={letters[1]} />
          </View>
          <View style={styles.columnCenter}>
            <Hexagon onPress={onLetterPress} letter={letters[2]} />
            <Hexagon center onPress={onLetterPress} letter={mainLetter} />
            <Hexagon onPress={onLetterPress} letter={letters[3]} />
          </View>
          <View>
            <Hexagon onPress={onLetterPress} letter={letters[4]} />
            <Hexagon onPress={onLetterPress} letter={letters[5]} />
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={shuffleLetters}
          >
            <Feather name="refresh-ccw" size={20} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onCheck}>
            <Text>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.topContainer}>
        <ProgressTracker progress={step} />
        <AnswerDrawer correctWords={correctWords} />
      </View>
    </View>
  );
};

export default SpellingBee;

const styles = StyleSheet.create({
  topContainer: { position: "absolute", top: 80 },
  bottomContainer: { position: "absolute", top: 250, alignItems: "center" },
  cursor: {
    height: 26,
    width: 2,
    backgroundColor: "#ffcf40",
    marginBottom: 22,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    flex: 1,
  },
  letter: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  mainLetter: {
    color: "#ff9f10",
    fontSize: 24,
    fontWeight: "bold",
  },
  tileContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
  },
  refreshButton: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 40,
  },
  button: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
  columnCenter: {
    marginHorizontal: 30,
  },
  letters: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 20,
  },
});
