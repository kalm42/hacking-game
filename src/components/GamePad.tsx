import React from "react";
import Line from "./Line";

interface GamePadProps {
  gibberish: string;
  rowsWithWords: number[];
  words: string[];
  handleAttempt: (word: string) => void;
}

const GamePad = (props: GamePadProps) => {
  const { gibberish, rowsWithWords, words, handleAttempt } = props;
  let pointer = 0;
  return (
    <>
      {Array(33)
        .fill(null)
        .map((_, row) => {
          const start = row * 12;
          const end = start + 12;
          const text = gibberish.substring(start, end);
          const hasWord = rowsWithWords.includes(row);
          let word = null;
          if (hasWord) {
            word = words[pointer];
            pointer++;
          }
          return (
            <Line
              key={row}
              text={text}
              hasWord={hasWord}
              word={word}
              handleAttempt={handleAttempt}
            />
          );
        })}
    </>
  );
};

export default GamePad;
