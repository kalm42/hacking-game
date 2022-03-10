import React, { useEffect, useMemo, useRef, useState } from "react";
import { randomNumber } from "../lib/random-number";
interface LineProps {
  text: string;
  hasWord: boolean;
  word: string | null;
  handleAttempt: (word: string) => void;
}
const Line = (props: LineProps) => {
  const { text, hasWord, word, handleAttempt } = props;
  const [clicked, setClicked] = useState(false);
  const [replacedWord, setReplacedWord] = useState<string>(word || "");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const replacedWordRef = useRef<string>("");
  const requestRef = useRef<number>();
  const numberOfSteps = useRef(0);
  const numberOfCharactersToReplace = useRef(0);
  const pointer = useRef(0);

  const wordLength = word?.length || 0;
  const lineLength = 12;

  // The hex code at the beginning of the line
  const hex = useMemo(
    () =>
      `0x${Array(4)
        .fill(0)
        .map((_, i) => Math.floor(Math.random() * 16).toString(16))
        .join("")}`,
    []
  );
  // Where to end the gibberish
  const firstWordEndsAt = useMemo(
    () => randomNumber(0, lineLength - wordLength),
    [wordLength]
  );
  // Where to start the gibberish back up
  const secondWordStartsAt = firstWordEndsAt + wordLength;

  // Characters to replace the selected word with
  const newGibberish = "!<>-_\\/[]{}—=+*^?#________";

  // Animates the transition between the selected word and the replacement
  const animate = () => {
    // if number of steps is 0 we're either starting or just finished with 1 character
    if (numberOfSteps.current === 0) {
      // chose a random character to replace
      pointer.current = randomNumber(0, replacedWordRef.current.length - 1);

      // chose a random numner of changes to make
      numberOfSteps.current = randomNumber(3, 10);

      // before we leave make sure the pointer is not aimed at a finished character
      while (replacedWordRef.current[pointer.current] === ".") {
        pointer.current = randomNumber(0, replacedWordRef.current.length - 1);
      }
    }

    // chose a gibberish character to replace with, if we're on the last step use '.'
    const newCharacter =
      numberOfSteps.current === 1
        ? "."
        : newGibberish[randomNumber(0, newGibberish.length - 1)];

    // decrement the number of steps
    numberOfSteps.current -= 1;
    // If number of steps is 0 at this point we have finished with a character
    // we can decrement the number of characters to replace
    if (numberOfSteps.current === 0) {
      numberOfCharactersToReplace.current -= 1;
    }

    // update the state
    setReplacedWord(() => {
      // compose the new word
      const newWord =
        replacedWordRef.current.substring(0, pointer.current) +
        newCharacter +
        replacedWordRef.current.substring(pointer.current + 1);
      replacedWordRef.current = newWord;
      return newWord;
    });

    // setup the next step if there is one
    setTimeout(() => {
      if (numberOfCharactersToReplace.current > 0) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }, 100);
  };

  const handleClick = () => {
    // If it has been clicked once, don't do anything
    if (clicked) return;

    // setup the animation to start
    numberOfCharactersToReplace.current = wordLength;
    replacedWordRef.current = word || "";
    requestRef.current = requestAnimationFrame(animate);

    // Update state and submit the word
    setClicked(true);
    handleAttempt(word || "");
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestRef.current!);
    };
  }, [wordLength]);

  return (
    <p className="w-max px-2">
      <span>{hex}</span>{" "}
      <span>
        {hasWord ? (
          <span>
            {text.substring(0, firstWordEndsAt)}
            <span
              className={`hover:text-green-500 cursor-pointer${
                clicked ? " font-semibold text-green-600" : ""
              }`}
              onClick={handleClick}
            >
              {clicked ? replacedWord?.toUpperCase() : word?.toUpperCase()}
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
