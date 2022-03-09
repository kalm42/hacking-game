import React from "react";
import { Attempt } from "../lib/types";

interface RecordProps {
  records: Attempt[];
}
const Record = (props: RecordProps) => {
  return (
    <div className="col-span-2">
      {props.records.map((record) => {
        return (
          <div key={record.word}>
            <p>
              &gt; <span className="uppercase">{record.word}</span>
            </p>
            <p>
              &gt; Match=<span>{record.likeness}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Record;
