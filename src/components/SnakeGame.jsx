import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaBolt, FaSkull } from "react-icons/fa";

/* =========================================================
   SnakeGame (Snake only)
   - Flat, fills container (no nested window)
   - Theme tokens derived from darkMode (no fixed colors)
   - Prevent page scroll on Arrow/WASD while active
   - Auto-scales to avoid scrollbars
   - Option B: lifts state up
     Props:
       darkMode?: boolean
       onScoreChange?: (score:number)=>void
       onStatusChange?: ({started, paused, gameOver}:{...})=>void
========================================================= */

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
  W: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  A: { x: -1, y: 0 },
  D: { x: 1, y: 0 },
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
  W: "S",
  S: "W",
  A: "D",
  D: "A",
};

const clampInterval = (ms) => Math.max(70, Math.min(260, ms));

function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight),
  };
}

const SnakeGame = ({ darkMode = false, onScoreChange, onStatusChange }) => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(randomFoodPosition());
  const [direction, setDirection] = useState(directions.ArrowRight);
  const [lastDirection, setLastDirection] = useState("ArrowRight");

  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const [score, setScore] = useState(0);
  const [speedMs, setSpeedMs] = useState(190);

  const wrapperRef = useRef(null);

  const ui = useMemo(() => {
    const border = darkMode ? "border-white/10" : "border-black/10";
    const screenBg = darkMode ? "bg-neutral-950" : "bg-[#f7f7f2]";
    const gridTint = darkMode ? "bg-white/[0.03]" : "bg-black/[0.02]";

    const overlayBg = darkMode ? "bg-black/45" : "bg-white/60";
    const overlayPanel = darkMode
      ? "bg-neutral-950/70 border-white/10 text-white"
      : "bg-white/80 border-black/10 text-neutral-900";

    const buttonPrimary = darkMode
      ? "bg-white text-neutral-900 hover:bg-white/90"
      : "bg-neutral-900 text-white hover:bg-neutral-800";
    const buttonGhost = darkMode
      ? "bg-white/0 text-white border-white/15 hover:bg-white/10"
      : "bg-black/0 text-neutral-900 border-black/15 hover:bg-black/5";

    const foodIcon = darkMode ? "text-white/90" : "text-neutral-900/80";
    const snakeHead = darkMode ? "bg-white/85" : "bg-neutral-900";
    const snakeBody = darkMode ? "bg-white/65" : "bg-neutral-900/75";

    const hint = darkMode ? "text-white/80" : "text-neutral-700";

    return {
      border,
      screenBg,
      gridTint,
      overlayBg,
      overlayPanel,
      buttonPrimary,
      buttonGhost,
      foodIcon,
      snakeHead,
      snakeBody,
      hint,
    };
  }, [darkMode]);

  const emitStatus = (next) => {
    if (typeof onStatusChange === "function") onStatusChange(next);
  };

  const reset = () => {
    setSnake(initialSnake);
    setFood(randomFoodPosition());
    setDirection(directions.ArrowRight);
    setLastDirection("ArrowRight");
    setScore(0);
    setSpeedMs(190);
    setGameOver(false);
    setPaused(false);
    setStarted(false);
  };

  // Lift state up
  useEffect(() => {
    if (typeof onScoreChange === "function") onScoreChange(score);
  }, [score, onScoreChange]);

  useEffect(() => {
    emitStatus({ started, paused, gameOver });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, paused, gameOver]);

  // Key handling + prevent scroll while active
  useEffect(() => {
    const handleKey = (event) => {
      const key = event.key;

      const isArrow =
        key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "ArrowLeft" ||
        key === "ArrowRight";

      const isWasd =
        key === "w" ||
        key === "a" ||
        key === "s" ||
        key === "d" ||
        key === "W" ||
        key === "A" ||
        key === "S" ||
        key === "D";

      if (started && (isArrow || isWasd)) event.preventDefault();

      if (!started && (key === "Enter" || key === " ")) {
        setStarted(true);
        event.preventDefault();
        return;
      }

      if (started && !gameOver && (key === "p" || key === "P")) {
        setPaused((p) => !p);
        event.preventDefault();
        return;
      }

      if (key === "Escape") {
        reset();
        event.preventDefault();
        return;
      }

      if (!started || gameOver || paused) return;

      if (directions[key] && key !== oppositeDirections[lastDirection]) {
        setDirection(directions[key]);
        setLastDirection(key);
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKey, { passive: false });
    return () => window.removeEventListener("keydown", handleKey);
  }, [started, gameOver, paused, lastDirection]);

  // Game loop
  useEffect(() => {
    if (!started || gameOver || paused) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const headSeg = newSnake[0];

        let next = { x: headSeg.x + direction.x, y: headSeg.y + direction.y };
        next.x = (next.x + gridWidth) % gridWidth;
        next.y = (next.y + gridHeight) % gridHeight;

        if (newSnake.some((seg) => seg.x === next.x && seg.y === next.y)) {
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(next);

        if (next.x === food.x && next.y === food.y) {
          setFood(randomFoodPosition());
          setScore((s) => s + 1);
          setSpeedMs((ms) => clampInterval(ms - 6));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, speedMs);
    return () => clearInterval(interval);
  }, [started, gameOver, paused, direction, food.x, food.y, speedMs]);

  const snakeSet = useMemo(() => {
    const s = new Set();
    snake.forEach((seg) => s.add(`${seg.x},${seg.y}`));
    return s;
  }, [snake]);

  const headKey = snake.length ? `${snake[0].x},${snake[0].y}` : null;

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-full ${ui.border} ${ui.screenBg}`}
    >
      <div className="w-full h-full flex items-stretch justify-stretch">
        {/* board keeps 40:20 = 2:1, and fills as much as possible */}
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-full h-full"
            style={{
              aspectRatio: "2 / 1",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <div
              className="w-full h-full grid"
              style={{
                gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: gridWidth * gridHeight }).map((_, i) => {
                const x = i % gridWidth;
                const y = Math.floor(i / gridWidth);
                const key = `${x},${y}`;

                const isSnake = snakeSet.has(key);
                const isHead = key === headKey;
                const isFood = food.x === x && food.y === y;

                return (
                  <div
                    key={i}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {isFood ? (
                      <FaBolt className={`${ui.foodIcon} text-[0.9em]`} />
                    ) : isSnake ? (
                      <div
                        className={`w-[70%] h-[70%] rounded-sm ${
                          isHead ? ui.snakeHead : ui.snakeBody
                        }`}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {!started && !gameOver && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${ui.overlayBg}`}
        >
          <div
            className={`rounded-3xl border p-6 w-[min(520px,92vw)] text-center backdrop-blur-xl ${ui.overlayPanel}`}
          >
            <div className="text-xl font-semibold">Press Enter to start</div>
            <div className={`mt-2 text-sm ${ui.hint}`}>
              Arrow/WASD • P pause • Esc exit
            </div>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                className={`cursor-pointer px-5 py-2 rounded-2xl font-semibold transition active:scale-[0.98] ${ui.buttonPrimary}`}
                onClick={() => setStarted(true)}
                type="button"
              >
                Play
              </button>
              <button
                className={`cursor-pointer px-5 py-2 rounded-2xl border font-semibold transition active:scale-[0.98] ${ui.buttonGhost}`}
                onClick={reset}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {started && !gameOver && paused && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${ui.overlayBg}`}
        >
          <div
            className={`rounded-3xl border p-6 w-[min(520px,92vw)] text-center backdrop-blur-xl ${ui.overlayPanel}`}
          >
            <div className="text-xl font-semibold">Paused</div>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                className={`cursor-pointer px-5 py-2 rounded-2xl font-semibold transition active:scale-[0.98] ${ui.buttonPrimary}`}
                onClick={() => setPaused(false)}
                type="button"
              >
                Resume
              </button>
              <button
                className={`cursor-pointer px-5 py-2 rounded-2xl border font-semibold transition active:scale-[0.98] ${ui.buttonGhost}`}
                onClick={reset}
                type="button"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {gameOver && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${ui.overlayBg}`}
        >
          <div
            className={`rounded-3xl border p-6 w-[min(560px,92vw)] text-center backdrop-blur-xl ${ui.overlayPanel}`}
          >
            <div className="text-xl font-semibold inline-flex items-center gap-2 justify-center">
              <FaSkull />
              <span>Game over</span>
            </div>
            <div className={`mt-2 text-sm ${ui.hint}`}>Score: {score}</div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                className={`cursor-pointer px-5 py-2 rounded-2xl font-semibold transition active:scale-[0.98] ${ui.buttonPrimary}`}
                onClick={() => {
                  setSnake(initialSnake);
                  setFood(randomFoodPosition());
                  setDirection(directions.ArrowRight);
                  setLastDirection("ArrowRight");
                  setScore(0);
                  setSpeedMs(190);
                  setGameOver(false);
                  setPaused(false);
                  setStarted(true);
                }}
                type="button"
              >
                Retry
              </button>
              <button
                className={`cursor-pointer px-5 py-2 rounded-2xl border font-semibold transition active:scale-[0.98] ${ui.buttonGhost}`}
                onClick={reset}
                type="button"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
