import { Attempt } from "../lib/types";
import Record from "./Record";

interface RecordsProps {
  records: Attempt[];
}
const Records = (props: RecordsProps) => {
  return (
    <div className="col-span-4 sm:col-span-3 md:col-span-2">
      {props.records.map((record) => {
        return <Record record={record} key={record.word} />;
      })}
    </div>
  );
};

export default Records;
