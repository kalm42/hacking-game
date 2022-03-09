import React from "react";
interface HeaderProps {
  attemptsRemaining: number;
  level: number;
}
const Header = (props: HeaderProps) => {
  const { attemptsRemaining, level } = props;
  return (
    <header>
      <h1>Welcome to ROBCO Industries (TM) Termlink</h1>
      <p>Password Required: Level {level}</p>
      <p>Attempts Remaing: {Array(attemptsRemaining).fill(`⬜️ `).join("")}</p>
    </header>
  );
};

export default Header;
