import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import GameArea from "./components/GameArea";
import Records from "./components/Records";
import { randomNumber } from "./lib/random-number";
import Four from "./lib/four-letter-words.json";
import { Attempt } from "./lib/types";
import match from "./lib/match";
import GameOver from "./components/GameOver";

function App() {
  const [level, setLevel] = useState(1);
  const [attemptsRemaining, setAttemptsRemaining] = useState(4);
  const [record, setRecord] = useState<Attempt[]>([]);

  const words = useMemo(
    () =>
      new Array(5 + level).fill(null).map(() => {
        return Four[randomNumber(0, Four.length - 1)];
      }),
    [level]
  );
  const winningWord = useMemo(
    () => words[randomNumber(0, words.length - 1)],
    [words]
  );

  const handleAttempt = (word: string) => {
    if (word === winningWord) {
      // reset attempts
      setAttemptsRemaining(4);
      // increase level
      setLevel((prevLevel) => prevLevel + 1);
      // reset record
      setRecord([]);
    } else {
      setAttemptsRemaining(attemptsRemaining - 1);
      // update record
      setRecord((prevRecord) => [
        ...prevRecord,
        { word, likeness: match(winningWord, word) },
      ]);
    }
  };

  return (
    <div className="container m-auto max-h-screen p-4">
      <Header attemptsRemaining={attemptsRemaining} level={level} />
      <main className="grid grid-cols-12">
        {attemptsRemaining > 0 ? (
          <GameArea level={level} words={words} handleAttempt={handleAttempt} />
        ) : (
          <GameOver level={level} />
        )}
        <Records records={record} />
      </main>
    </div>
  );
}

export default App;
