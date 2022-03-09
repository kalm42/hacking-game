import React, { useEffect, useRef, useState } from "react";

interface AttemptingsProps {
  word: string;
}
const Attemptings = (props: AttemptingsProps) => {
  const [word, setWord] = useState("");
  //  Holds the request animation frame id
  const requestRef = useRef<number>();
  const previousWordLengthRef = useRef<number>();

  const animate = () => {
    if (previousWordLengthRef.current !== undefined) {
      setWord(props.word.substring(0, previousWordLengthRef.current + 1));
      previousWordLengthRef.current += 1;
    } else {
      previousWordLengthRef.current = 0;
    }

    setTimeout(() => {
      if (previousWordLengthRef.current !== props.word.length) {
        // Run it again!
        requestRef.current = requestAnimationFrame(animate);
      }
    }, 100);
  };

  useEffect(() => {
    // Start the animation
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <p>
      &gt; <span className="uppercase">{word}</span>
    </p>
  );
};

export default Attemptings;
