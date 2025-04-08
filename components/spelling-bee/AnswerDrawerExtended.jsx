import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const CHUNK = 10;
const COLUMNS = 2;
const { width } = Dimensions.get("window");

const AnimatedAnswerDrawer = ({ correctWords }) => {
  const [page, setPage] = React.useState(0);
  const scrollRef = React.useRef();

  const pages = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < correctWords.length; i += CHUNK) {
      const chunk = correctWords.slice(i, i + CHUNK);
      list.push(chunk);
    }
    const pages = [];
    for (let i = 0; i < list.length; i += COLUMNS) {
      const chunk = list.slice(i, i + COLUMNS);
      pages.push(chunk);
    }
    return pages;
  }, [correctWords]);

  const handlePressNextStep = (index) => {
    setPage(index);
    scrollRef?.current?.scrollTo({
      x: stepFormWidth * index,
    });
  };

  const stepFormWidth = width - 30 * 2;

  const onScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.ceil(offset / stepFormWidth);
    setPage(index);
  };

  return (
    <View style={styles.correctList}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        onScroll={onScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {pages.map((page) => (
          <View style={{ width: stepFormWidth, flexDirection: "row" }}>
            <View style={{ width: stepFormWidth / 2, paddingRight: 10 }}>
              {page[0]?.map((word, index) => (
                <View key={index} style={styles.correctWord}>
                  <Text>{word[0] + word.slice(1).toLowerCase()}</Text>
                </View>
              ))}
            </View>
            <View style={{ width: stepFormWidth / 2, paddingRight: 10 }}>
              {page[1]?.map((word, index) => (
                <View key={index} style={styles.correctWord}>
                  <Text>{word[0] + word.slice(1).toLowerCase()}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {pages.length > 1 && (
          <>
            {pages.map((_, index) => (
              <TouchableOpacity
                onPress={() => handlePressNextStep(index)}
                style={[styles.dot, page === index && styles.dotActive]}
              ></TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

export default AnimatedAnswerDrawer;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    alignContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    position: "relative",
  },
  correctList: {
    marginTop: 10,
  },
  correctWord: {
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    height: 30,
    justifyContent: "center",
    paddingLeft: 5,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },
  dot: {
    alignSelf: "center",
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: "#ffcf40",
  },
});
