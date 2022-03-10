import React, { useMemo } from "react";
import { randomNumber } from "../lib/random-number";
import GamePad from "./GamePad";

interface GameAreaProps {
  level: number;
  words: string[];
  handleAttempt: (word: string) => void;
}

const symbols = [
  "`",
  "~",
  ".",
  '"',
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  "|",
  "_",
  "+",
  "=",
  "<",
  ">",
  "?",
  ":",
  ";",
]; // 27 symbols

const GameArea = (props: GameAreaProps) => {
  const { level, words, handleAttempt } = props;

  //  generate random gibberish
  const randomGibberish = useMemo(
    () =>
      new Array(33 * 12)
        .fill(level)
        .map(() => {
          return symbols[Math.floor(Math.random() * symbols.length)];
        })
        .join(""),
    [level]
  );

  const rowsWithWords = useMemo(
    () =>
      new Array(5 + level).fill(null).map((_, i, arr) => {
        let row = randomNumber(0, 33);
        while (arr.includes(row)) {
          row = randomNumber(0, 33);
        }
        return row;
      }),
    [level]
  );

  //   game grid is 12 x 32 or 384 characters long
  return (
    <div className="col-span-8 sm:col-span-9 flex flex-wrap">
      <GamePad
        gibberish={randomGibberish}
        handleAttempt={handleAttempt}
        rowsWithWords={rowsWithWords}
        words={words}
      />
    </div>
  );
};

export default React.memo(GameArea);
