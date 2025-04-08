import React from "react";

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

const useLetters = () => {
  const correct = [
    "tech",
    "heck",
    "kite",
    "nice",
    "tine",
    "then",
    "neck",
    "tike",
    "cite",
    "etch",
    "hike",
    "kent",
    "tike",
    "tenth",
    "niche",
    "ketch",
    "chine",
    "kitchen"
  ];
  const startLetters = ["H", "K", "T", "I", "C", "N"];
  const mainLetter = "E";

  const [letters, setLetters] = React.useState(startLetters);

  const shuffleLetters = () => {
    const newLetters = [...letters];
    shuffle(newLetters);
    setLetters(newLetters);
  };

  const checkWord = (word) => {
    return correct.includes(word.toLowerCase());
  };

  return { letters, mainLetter, shuffleLetters, checkWord };
};

export default useLetters;
