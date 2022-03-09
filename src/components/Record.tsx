import { Attempt } from "../lib/types";
import Attemptings from "./Attemptings";

interface RecordProps {
  records: Attempt[];
}
const Record = (props: RecordProps) => {
  return (
    <div className="col-span-2">
      {props.records.map((record) => {
        return (
          <div key={record.word}>
            <Attemptings word={record.word} />
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
