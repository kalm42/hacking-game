import React, { useMemo } from "react";
import { randomNumber } from "../lib/random-number";
interface LineProps {
  text: string;
  hasWord: boolean;
  word: string | null;
  handleAttempt: (word: string) => void;
}
const Line = (props: LineProps) => {
  const { text, hasWord, word, handleAttempt } = props;
  const wordLength = word?.length || 0;
  const lineLength = 12;
  const hex = useMemo(
    () =>
      `0x${Array(4)
        .fill(0)
        .map((_, i) => Math.floor(Math.random() * 16).toString(16))
        .join("")}`,
    []
  );

  const firstWordEndsAt = useMemo(
    () => randomNumber(0, lineLength - wordLength),
    [wordLength]
  );
  const secondWordStartsAt = firstWordEndsAt + wordLength;

  return (
    <p className="w-max px-2">
      <span>{hex}</span>{" "}
      <span>
        {hasWord ? (
          <span>
            {text.substring(0, firstWordEndsAt)}
            <span
              className="hover:text-green-500 cursor-pointer"
              onClick={() => handleAttempt(word || "")}
            >
              {word?.toUpperCase()}
            </span>
            {text.substring(secondWordStartsAt, 12)}
          </span>
        ) : (
          text
        )}
      </span>
    </p>
  );
};

export default Line;
