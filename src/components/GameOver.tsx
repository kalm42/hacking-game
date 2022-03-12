import React from "react";

interface GameOverProps {
  level: number;
}
const GameOver = (props: GameOverProps) => {
  const handleShare = async () => {
    const data = {
      url: window.location.hostname,
      text: `I'm a level ${props.level} hacker.`,
      title: `Hacker Game`,
    };
    if (navigator.share) {
      await navigator.share(data);
    }
    alert("shared");
  };

  return (
    <div className="col-span-8 sm:col-span-9 md:col-span-10">
      <h2 className="text-2xl">Game Over</h2>
      <p>Thank you for playing.</p>
      {Boolean(navigator.share) && (
        <button
          className="mt-4 bg-lime-600 text-white hover:shadow-lime-400 hover:shadow-lg p-4 rounded-lg"
          onClick={handleShare}
        >
          Share
        </button>
      )}
    </div>
  );
};

export default GameOver;
