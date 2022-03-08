import React from "react";
import coinToss from "../lib/coin-toss";
import { randomNumers } from "../lib/random-number";
import Line from "./Line";

const GameArea = () => {
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

  //  generate random gibberish
  const randomGibberish = new Array(33 * 12)
    .fill(null)
    .map(() => {
      return symbols[Math.floor(Math.random() * symbols.length)];
    })
    .join("");

  const rowsWithWords = new Array(5).fill(null).map((_, i, arr) => {
    let row = randomNumers(0, 33);
    while (arr.includes(row)) {
      row = randomNumers(0, 33);
    }
    return row;
  });

  //   game grid is 12 x 32 or 384 characters long
  return (
    <div className="col-span-10 flex flex-wrap">
      {Array(33)
        .fill(null)
        .map((_, row) => {
          const start = row * 12;
          const end = start + 12;
          let text = randomGibberish.substring(start, end);
          return (
            <Line key={row} text={text} hasWord={rowsWithWords.includes(row)} />
          );
        })}
    </div>
  );
};

export default GameArea;
