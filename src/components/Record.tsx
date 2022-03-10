import React, { useEffect, useRef, useState } from "react";
import { Attempt } from "../lib/types";
import Attemptings from "./Attemptings";

interface RecordProps {
  record: Attempt;
}

const Record = (props: RecordProps) => {
  const { record } = props;
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setShow(true);
    }, 700);
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Attemptings word={record.word} />
      <p>
        {show && (
          <>
            &gt; Match = <span>{record.likeness}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default Record;
