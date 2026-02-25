import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBolt,
  FaSkull,
  FaMicrochip,
  FaNetworkWired,
  FaServer,
  FaDatabase,
  FaCloud,
  FaCogs,
  FaBug,
  FaCode,
} from "react-icons/fa";

/* =========================================================
   Nostalgia.exe
   - Single container (no nested "cards")
   - Tabs select game
   - Prevent page scrolling on Arrow keys while playing
========================================================= */

const Tab = ({ active, children, onClick, darkMode }) => {
  const base = darkMode
    ? "bg-white/8 hover:bg-white/12 text-white border-white/10"
    : "bg-black/5 hover:bg-black/10 text-neutral-900 border-black/10";
  const activeCls = active ? "ring-2 ring-cyan-400/40" : "";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border px-4 py-2 text-sm font-semibold transition active:scale-[0.98] ${base} ${activeCls}`}
    >
      {children}
    </button>
  );
};

/* =========================
   Snake (icons only)
========================= */
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

const clampInterval = (ms) => Math.max(70, Math.min(260, ms));

function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight),
  };
}

const Snake = ({ darkMode }) => {
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
  const [scale, setScale] = useState(1);

  const ui = useMemo(() => {
    const text = darkMode ? "text-neutral-100" : "text-neutral-900";
    const sub = darkMode ? "text-neutral-300" : "text-neutral-600";
    const border = darkMode ? "border-white/10" : "border-black/10";
    return { text, sub, border };
  }, [darkMode]);

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

  // scale to avoid scrollbar
  useEffect(() => {
    if (!wrapperRef.current || !("ResizeObserver" in window)) return;
    const boardW = 40 * 20; // 800px at 20px cell
    const padding = 24;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const next = Math.min(1, (w - padding) / boardW);
      setScale(Number.isFinite(next) ? Math.max(0.62, next) : 1);
    });
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  // prevent arrow scroll when game is active
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

  // loop
  useEffect(() => {
    if (!started || gameOver || paused) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = newSnake[0];

        let next = { x: head.x + direction.x, y: head.y + direction.y };
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
    <div ref={wrapperRef} className="w-full">
      <div
        className={`mb-3 flex items-center justify-between gap-3 flex-wrap text-xs ${ui.sub}`}
      >
        <span>Controls: Arrow/WASD • Enter start • P pause</span>
        <span className={`${ui.text} font-semibold`}>Score: {score}</span>
      </div>

      <div className="w-full flex items-center justify-center">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <div
            className={`relative rounded-3xl border ${ui.border} shadow-md overflow-hidden bg-neutral-950`}
            style={{ width: 800 }}
          >
            <div
              className={`flex items-center justify-between px-4 py-3 border-b ${ui.border}`}
            >
              <div className={`text-sm font-semibold ${ui.text}`}>
                snakeoverflow
              </div>
              <div className={`text-xs ${ui.sub}`}>
                {paused
                  ? "Paused"
                  : gameOver
                    ? "Stopped"
                    : started
                      ? "Running"
                      : "Ready"}
              </div>
            </div>

            <div className="p-3">
              <div className="rounded-2xl overflow-hidden">
                <div className="grid grid-cols-40">
                  {Array.from({ length: gridWidth * gridHeight }).map(
                    (_, i) => {
                      const x = i % gridWidth;
                      const y = Math.floor(i / gridWidth);
                      const key = `${x},${y}`;
                      const isSnake = snakeSet.has(key);
                      const isHead = key === headKey;
                      const isFood = food.x === x && food.y === y;

                      return (
                        <div
                          key={i}
                          className="w-5 h-5 flex items-center justify-center select-none"
                        >
                          {isFood ? (
                            <FaBolt className="text-yellow-300 text-[14px]" />
                          ) : isSnake ? (
                            <div
                              className={`h-[14px] w-[14px] rounded-sm ${isHead ? "bg-emerald-300" : "bg-emerald-500"}`}
                            />
                          ) : null}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            {!started && !gameOver && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`rounded-3xl border ${ui.border} bg-black/35 backdrop-blur-xl shadow-lg p-6 w-[min(520px,92vw)] text-center`}
                >
                  <div className="text-white text-xl font-semibold">
                    Press Enter to start
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      className="cursor-pointer px-5 py-2 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition active:scale-[0.98]"
                      onClick={() => setStarted(true)}
                      type="button"
                    >
                      Play
                    </button>
                    <button
                      className="cursor-pointer px-5 py-2 rounded-2xl border border-white/15 text-white hover:bg-white/10 transition active:scale-[0.98]"
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`rounded-3xl border ${ui.border} bg-black/35 backdrop-blur-xl shadow-lg p-6 w-[min(520px,92vw)] text-center`}
                >
                  <div className="text-white text-xl font-semibold">Paused</div>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      className="cursor-pointer px-5 py-2 rounded-2xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition active:scale-[0.98]"
                      onClick={() => setPaused(false)}
                      type="button"
                    >
                      Resume
                    </button>
                    <button
                      className="cursor-pointer px-5 py-2 rounded-2xl border border-white/15 text-white hover:bg-white/10 transition active:scale-[0.98]"
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`rounded-3xl border ${ui.border} bg-black/35 backdrop-blur-xl shadow-lg p-6 w-[min(560px,92vw)] text-center`}
                >
                  <div className="text-white text-xl font-semibold inline-flex items-center gap-2 justify-center">
                    <FaSkull />
                    <span>Game over</span>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      className="cursor-pointer px-5 py-2 rounded-2xl bg-white text-neutral-900 font-semibold hover:bg-neutral-100 transition active:scale-[0.98]"
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
                      className="cursor-pointer px-5 py-2 rounded-2xl border border-white/15 text-white hover:bg-white/10 transition active:scale-[0.98]"
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
        </div>
      </div>
    </div>
  );
};

/* =========================
   Pong (canvas) - prevent scroll
========================= */
const Pong = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const [running, setRunning] = useState(false);
  const [score, setScore] = useState({ left: 0, right: 0 });

  const ui = useMemo(() => {
    const text = darkMode ? "text-neutral-100" : "text-neutral-900";
    const sub = darkMode ? "text-neutral-300" : "text-neutral-600";
    const border = darkMode ? "border-white/10" : "border-black/10";
    return { text, sub, border };
  }, [darkMode]);

  const stateRef = useRef({
    w: 720,
    h: 420,
    paddleH: 84,
    paddleW: 10,
    leftY: 168,
    rightY: 168,
    ballX: 360,
    ballY: 210,
    vx: 5,
    vy: 3,
    leftDir: 0,
    rightDir: 0,
  });

  const resetRound = () => {
    const s = stateRef.current;
    s.leftY = (s.h - s.paddleH) / 2;
    s.rightY = (s.h - s.paddleH) / 2;
    s.ballX = s.w / 2;
    s.ballY = s.h / 2;
    const dir = Math.random() < 0.5 ? -1 : 1;
    s.vx = 5 * dir;
    s.vy = Math.random() * 4 - 2 || 2;
  };

  const stop = () => {
    setRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  // key handling + prevent scroll
  useEffect(() => {
    resetRound();

    const onKeyDown = (e) => {
      const s = stateRef.current;

      const isArrow = e.key === "ArrowUp" || e.key === "ArrowDown";
      if (running && isArrow) e.preventDefault();

      if (e.key === "Enter") {
        setRunning(true);
        e.preventDefault();
      }
      if (e.key === "Escape") {
        stop();
        e.preventDefault();
      }

      if (e.key === "w" || e.key === "W") {
        s.leftDir = -1;
        e.preventDefault();
      }
      if (e.key === "s" || e.key === "S") {
        s.leftDir = 1;
        e.preventDefault();
      }
      if (e.key === "ArrowUp") {
        s.rightDir = -1;
        e.preventDefault();
      }
      if (e.key === "ArrowDown") {
        s.rightDir = 1;
        e.preventDefault();
      }
    };

    const onKeyUp = (e) => {
      const s = stateRef.current;
      if (e.key === "w" || e.key === "W") s.leftDir = 0;
      if (e.key === "s" || e.key === "S") s.leftDir = 0;
      if (e.key === "ArrowUp") s.rightDir = 0;
      if (e.key === "ArrowDown") s.rightDir = 0;
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    canvas.width = s.w;
    canvas.height = s.h;

    const step = () => {
      const speed = 7;
      s.leftY += s.leftDir * speed;
      s.rightY += s.rightDir * speed;
      s.leftY = Math.max(0, Math.min(s.h - s.paddleH, s.leftY));
      s.rightY = Math.max(0, Math.min(s.h - s.paddleH, s.rightY));

      s.ballX += s.vx;
      s.ballY += s.vy;

      if (s.ballY <= 8 || s.ballY >= s.h - 8) s.vy *= -1;

      const leftX = 24;
      const rightX = s.w - 24 - s.paddleW;

      const hitLeft =
        s.ballX <= leftX + s.paddleW + 8 &&
        s.ballX >= leftX &&
        s.ballY >= s.leftY &&
        s.ballY <= s.leftY + s.paddleH;

      const hitRight =
        s.ballX >= rightX - 8 &&
        s.ballX <= rightX + s.paddleW &&
        s.ballY >= s.rightY &&
        s.ballY <= s.rightY + s.paddleH;

      if (hitLeft) {
        s.vx = Math.abs(s.vx) + 0.15;
        const rel = (s.ballY - (s.leftY + s.paddleH / 2)) / (s.paddleH / 2);
        s.vy = rel * 5;
      }
      if (hitRight) {
        s.vx = -(Math.abs(s.vx) + 0.15);
        const rel = (s.ballY - (s.rightY + s.paddleH / 2)) / (s.paddleH / 2);
        s.vy = rel * 5;
      }

      if (s.ballX < -20) {
        setScore((sc) => ({ ...sc, right: sc.right + 1 }));
        resetRound();
      }
      if (s.ballX > s.w + 20) {
        setScore((sc) => ({ ...sc, left: sc.left + 1 }));
        resetRound();
      }

      ctx.clearRect(0, 0, s.w, s.h);
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, s.w, s.h);

      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(s.w / 2, 10);
      ctx.lineTo(s.w / 2, s.h - 10);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillRect(24, s.leftY, s.paddleW, s.paddleH);
      ctx.fillRect(s.w - 24 - s.paddleW, s.rightY, s.paddleW, s.paddleH);

      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, 7, 0, Math.PI * 2);
      ctx.fill();

      if (running) rafRef.current = requestAnimationFrame(step);
    };

    if (running) rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  return (
    <div className="w-full">
      <div
        className={`mb-3 flex items-center justify-between gap-3 flex-wrap text-xs ${ui.sub}`}
      >
        <span>Controls: W/S • ↑/↓ • Enter start • Esc stop</span>
        <span className={`${ui.text} font-semibold`}>
          {score.left} : {score.right}
        </span>
      </div>

      <div
        className={`rounded-3xl border ${ui.border} bg-neutral-950 shadow-md overflow-hidden`}
      >
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${ui.border}`}
        >
          <div className={`text-sm font-semibold ${ui.text}`}>pong</div>
          <div className={`text-xs ${ui.sub}`}>
            {running ? "Running" : "Ready"}
          </div>
        </div>

        <div className="p-3 flex items-center justify-center">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <canvas ref={canvasRef} />
          </div>
        </div>

        <div className="px-4 pb-4 flex justify-center gap-3 flex-wrap">
          <button
            className="cursor-pointer px-5 py-2 rounded-2xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition active:scale-[0.98]"
            onClick={() => setRunning(true)}
            type="button"
          >
            Start
          </button>
          <button
            className="cursor-pointer px-5 py-2 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition active:scale-[0.98]"
            onClick={() => {
              stop();
              setScore({ left: 0, right: 0 });
              resetRound();
            }}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================
   Memory Match (icons)
========================= */
const MemoryMatch = ({ darkMode }) => {
  const ui = useMemo(() => {
    const text = darkMode ? "text-neutral-100" : "text-neutral-900";
    const sub = darkMode ? "text-neutral-300" : "text-neutral-600";
    const border = darkMode ? "border-white/10" : "border-black/10";
    return { text, sub, border };
  }, [darkMode]);

  const icons = useMemo(
    () => [
      { id: "chip", C: FaMicrochip },
      { id: "net", C: FaNetworkWired },
      { id: "srv", C: FaServer },
      { id: "db", C: FaDatabase },
      { id: "cloud", C: FaCloud },
      { id: "cogs", C: FaCogs },
      { id: "bug", C: FaBug },
      { id: "code", C: FaCode },
    ],
    [],
  );

  const buildDeck = () =>
    [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((v, idx) => ({ id: idx, v, open: false, matched: false }));

  const [deck, setDeck] = useState(buildDeck);
  const [moves, setMoves] = useState(0);
  const [openIds, setOpenIds] = useState([]);

  const reset = () => {
    setDeck(buildDeck());
    setMoves(0);
    setOpenIds([]);
  };

  const onPick = (card) => {
    if (card.matched || card.open) return;
    if (openIds.length === 2) return;

    setDeck((d) => d.map((c) => (c.id === card.id ? { ...c, open: true } : c)));
    setOpenIds((ids) => [...ids, card.id]);
  };

  useEffect(() => {
    if (openIds.length !== 2) return;

    const [a, b] = openIds;
    const ca = deck.find((c) => c.id === a);
    const cb = deck.find((c) => c.id === b);
    if (!ca || !cb) return;

    setMoves((m) => m + 1);

    if (ca.v.id === cb.v.id) {
      setDeck((d) =>
        d.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)),
      );
      setOpenIds([]);
      return;
    }

    const t = setTimeout(() => {
      setDeck((d) =>
        d.map((c) => (c.id === a || c.id === b ? { ...c, open: false } : c)),
      );
      setOpenIds([]);
    }, 650);

    return () => clearTimeout(t);
  }, [openIds, deck]);

  const done = deck.every((c) => c.matched);

  return (
    <div className="w-full">
      <div
        className={`mb-3 flex items-center justify-between gap-3 flex-wrap text-xs ${ui.sub}`}
      >
        <span>Match the pairs</span>
        <span className={`${ui.text} font-semibold`}>Moves: {moves}</span>
      </div>

      <div
        className={`rounded-3xl border ${ui.border} bg-neutral-950 shadow-md overflow-hidden`}
      >
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${ui.border}`}
        >
          <div className={`text-sm font-semibold ${ui.text}`}>memory</div>
          <div className={`text-xs ${ui.sub}`}>
            {done ? "Completed" : "Running"}
          </div>
        </div>

        <div className="p-4 grid grid-cols-4 gap-2">
          {deck.map((c) => {
            const Icon = c.v.C;
            const show = c.open || c.matched;
            return (
              <button
                key={c.id}
                type="button"
                className={`cursor-pointer rounded-2xl border ${ui.border} bg-white/5 hover:bg-white/10 transition active:scale-[0.98] h-16 flex items-center justify-center ${
                  c.matched ? "opacity-60" : ""
                }`}
                onClick={() => onPick(c)}
                aria-label="memory card"
              >
                {show ? (
                  <Icon className="text-white text-xl" />
                ) : (
                  <span className="text-white/40 text-lg">•</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-4 flex justify-center gap-3 flex-wrap">
          <button
            className="cursor-pointer px-5 py-2 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition active:scale-[0.98]"
            onClick={reset}
            type="button"
          >
            New game
          </button>
        </div>
      </div>
    </div>
  );
};

const SnakeGame = ({ darkMode = false }) => {
  const [mode, setMode] = useState("snake");

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-4">
        <Tab
          active={mode === "snake"}
          onClick={() => setMode("snake")}
          darkMode={darkMode}
        >
          Snake
        </Tab>
        <Tab
          active={mode === "pong"}
          onClick={() => setMode("pong")}
          darkMode={darkMode}
        >
          Pong
        </Tab>
        <Tab
          active={mode === "memory"}
          onClick={() => setMode("memory")}
          darkMode={darkMode}
        >
          Memory
        </Tab>
      </div>

      {mode === "snake" && <Snake darkMode={darkMode} />}
      {mode === "pong" && <Pong darkMode={darkMode} />}
      {mode === "memory" && <MemoryMatch darkMode={darkMode} />}
    </div>
  );
};

export default SnakeGame;
