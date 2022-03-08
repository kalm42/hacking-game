import React, { useMemo } from "react";
interface LineProps {
  text: string;
  hasWord: boolean;
}
const Line = (props: LineProps) => {
  const { text, hasWord } = props;
  const hex = useMemo(
    () =>
      `0x${Array(4)
        .fill(0)
        .map((_, i) => Math.floor(Math.random() * 16).toString(16))
        .join("")
        .toUpperCase()}`,
    []
  );
  return (
    <p className="w-max px-2">
      <span>{hex}</span> <span>{hasWord ? "FUN".padStart(12, "0") : text}</span>
    </p>
  );
};

export default Line;
