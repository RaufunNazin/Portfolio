import React, { useState, useEffect } from "react";

const gridWidth = 40;
const gridHeight = 20;
const initialSnake = [{ x: 5, y: 5 }];
const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};
const oppositeDirections = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
  w: "s",
  s: "w",
  a: "d",
  d: "a",
};
const foodIcons = [
  "🖥️",
  "💻",
  "🧑‍💻",
  "🖱️",
  "📱",
  "🧠",
  "💾",
  "🗂️",
  "🖲️",
  "🛠️",
  "🔋",
  "🖧",
  "📺",
  "📷",
  "🎮",
  "⌨️",
  "📂",
  "🖨️",
  "💼",
];
const SnakeGame = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(randomFoodPosition());
  const [direction, setDirection] = useState(directions.ArrowRight);
  const [lastDirection, setLastDirection] = useState("ArrowRight");
  const [gameOver, setGameOver] = useState(false);
  const [foodIcon, setFoodIcon] = useState(randomFoodIcon());
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  let highScore = localStorage.getItem("snakeHighScore") || 0;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (started) {
        if (
          directions[event.key] &&
          event.key !== oppositeDirections[lastDirection]
        ) {
          setDirection(directions[event.key]);
          setLastDirection(event.key);
          event.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [started, lastDirection]);

  useEffect(() => {
    localStorage.setItem("snakeHighScore", Math.max(score, highScore));
    if (gameOver || !started) return;
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver, started, score]);

  function randomFoodPosition() {
    return {
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight),
    };
  }

  function randomFoodIcon() {
    return foodIcons[Math.floor(Math.random() * foodIcons.length)];
  }

  function moveSnake() {
    const newSnake = [...snake];
    let head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    head.x = (head.x + gridWidth) % gridWidth;
    head.y = (head.y + gridHeight) % gridHeight;

    if (
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setFood(randomFoodPosition());
      setFoodIcon(randomFoodIcon());
      setScore(score + 1);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  return (
    <div className="relative flex items-center justify-center">
      {
        <div
          className={`relative grid grid-cols-40 rounded-md ${
            !started
              ? "bg-gray-800/80 backdrop-blur-xl"
              : gameOver
              ? "bg-red-800/80 backdrop-blur-xl"
              : "bg-gray-800"
          }`}
        >
          {Array.from({ length: gridWidth * gridHeight }).map((_, i) => {
            const x = i % gridWidth;
            const y = Math.floor(i / gridWidth);
            const isSnake = snake.some(
              (segment) => segment.x === x && segment.y === y
            );
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={i}
                className="w-5 h-5 flex items-center justify-center text-lg"
              >
                {isSnake ? "🟩" : isFood ? foodIcon : ""}
              </div>
            );
          })}
        </div>
      }
      {!started && !gameOver && (
        <div className="absolute flex flex-col justify-center">
          <div className="text-[#efefed] text-3xl text-center font-light">
            snake<span className="font-bold">overflow</span>
          </div>
          <div className="text-yellow-400 text-sm text-end -mt-2">
            {"a snaking game :)"}
          </div>
          <button
            className="bg-green-500 text-white px-5 py-2 rounded-lg text-lg cursor-pointer hover:bg-green-600 transition-all duration-200 mt-5"
            onClick={() => setStarted(true)}
          >
            Play
          </button>
          <div className="text-[#efefed] text-sm text-center">
            Use Arrow Keys or WASD to Move
          </div>
        </div>
      )}
      {gameOver && (
        <div className="absolute flex flex-col items-center text-[#efefed] p-5 rounded-lg">
          <div className="text-[#efefed] text-3xl text-center">
            💀 snake.exe has stopped working 💀
          </div>
          <div className="text-gray-300 text-sm text-center">
            Skill Issue? Or just a bug?
          </div>
          <div className="text-yellow-400 mt-5">Your High Score: {highScore}</div>
          <div className="text-[#efefed]">Your Score: {score}</div>
          <button
            className="bg-[#efefed] text-gray-800 px-3 py-1 rounded-lg text-lg mt-5 cursor-pointer transition-all duration-200 hover:bg-gray-200 animate-bounce"
            onClick={() => {
              setSnake(initialSnake);
              setFood(randomFoodPosition());
              setDirection(directions.ArrowRight);
              setScore(0);
              setGameOver(false);
            }}
          >
            Retry?
          </button>
          <button
            className="text-sm cursor-pointer underline-button-2"
            onClick={() => {
              setStarted(false);
              setGameOver(false);
              setSnake(initialSnake);
            }}
          >
            No, thanks. I'm done with this game.
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
