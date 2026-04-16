import { useState } from "react";
import { FiActivity, FiPlay, FiRotateCcw, FiTerminal } from "react-icons/fi";

const funnyRunMessages = [
  "> Compiling... 100%. Bugs generated: 42.",
  "> Deploying to production... Wait, it's Friday! Abort! 🛑",
  "> Executing... Error: Developer needs more coffee. ☕",
  "> rm -rf / ... Just kidding.",
  "> AI is reviewing your code... AI is disappointed.",
  "> Synthesizing... Output: 'Hello World'. Groundbreaking.",
];

export default function CodeEditor({ project, darkMode, ui }) {
  // Generate the initial string formatting
  const initialCode = `${project.title}\n// ${project.subtitle}\n\n${project.bullets
    .map((b) => `* ${b}`)
    .join("\n")}\n\nconst impact = [${project.impact
    .map((t) => `'${t}'`)
    .join(", ")}];`;

  const [code, setCode] = useState(initialCode);
  const [terminalMsg, setTerminalMsg] = useState("");
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  const lines = code.split("\n");

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    const newLines = newCode.split("\n");

    // Cap at 30 lines
    if (newLines.length > 30) {
      setShowLimitWarning(true);
      setTerminalMsg(
        "> ERROR: Max 30 lines reached. Cloud bills ain't cheap! 💸",
      );
      setTimeout(() => setShowLimitWarning(false), 3000);
      return;
    }

    setCode(newCode);
    if (terminalMsg) setTerminalMsg(""); // Clear terminal on type
  };

  const handleRestore = () => {
    setCode(initialCode);
    setTerminalMsg("> git checkout -- . (Changes restored)");
  };

  const handleRun = () => {
    const randomMsg =
      funnyRunMessages[Math.floor(Math.random() * funnyRunMessages.length)];
    setTerminalMsg(randomMsg);
  };

  // FIX: Stop the global SnakeGame listener from intercepting keys typed in the editor
  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
  };

  // Determine if file is "Modified" based on project status
  const isModified =
    project.status === "In progress" || project.status === "Under Dev";
  const fileName = project.title.split(" ")[0].toLowerCase() + ".ts";

  return (
    <div
      className={`group rounded-xl border ${ui.border} ${
        darkMode ? "bg-[#0d0d0d]" : "bg-[#f8f9fa]"
      } shadow-md overflow-hidden flex flex-col h-full relative`}
    >
      {/* Easter Egg Limit Warning Overlay */}
      <div
        className={`absolute top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/90 text-white text-xs font-bold rounded shadow-lg backdrop-blur-sm z-50 transition-all duration-300 pointer-events-none ${
          showLimitWarning
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        Line limit reached! 🛑
      </div>

      {/* VS Code Tab Header */}
      <div
        className={`flex items-center justify-between px-2 h-10 border-b ${ui.border} ${
          darkMode ? "bg-[#161616]" : "bg-[#ececec]"
        } font-mono text-[11px]`}
      >
        <div className="flex items-center h-full">
          <div
            className={`px-4 h-full flex items-center gap-2 border-r ${ui.border} ${
              darkMode ? "bg-[#0d0d0d] text-white" : "bg-[#f8f9fa] text-black"
            } ${isModified ? "text-yellow-500 dark:text-yellow-400" : ""}`}
          >
            <FiActivity
              className={
                project.status === "Finished"
                  ? "text-emerald-500"
                  : "text-cyan-500"
              }
            />
            <span>{fileName}</span>
            {isModified && <span className="font-bold ml-1">M</span>}
          </div>
        </div>

        {/* Editor Controls */}
        <div className="flex items-center gap-1 pr-2">
          <button
            onClick={handleRestore}
            title="Restore original code"
            className={`p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${ui.subtext} hover:text-cyan-500 cursor-pointer`}
          >
            <FiRotateCcw size={14} />
          </button>
          <button
            onClick={handleRun}
            title="Run code"
            className={`p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${ui.subtext} hover:text-emerald-500 cursor-pointer`}
          >
            <FiPlay size={14} />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex flex-col font-mono text-[13px] sm:text-sm relative overflow-hidden">
        {/* Editor Area (Line Numbers + Textarea) */}
        <div className="flex flex-1 p-4 overflow-y-auto">
          {/* Line Numbers */}
          <div
            className={`flex flex-col text-right select-none pr-4 mr-2 border-r border-black/10 dark:border-white/10 ${
              darkMode ? "text-neutral-600" : "text-neutral-400"
            }`}
            // Using a strict line height to keep numbers and text aligned perfectly
            style={{ lineHeight: "1.6rem" }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Interactive Text Area */}
          <textarea
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            className={`flex-1 bg-transparent outline-none resize-none whitespace-pre overflow-x-auto ${
              darkMode ? "text-neutral-300" : "text-neutral-700"
            }`}
            style={{
              lineHeight: "1.6rem",
              height: `${Math.max(10, lines.length) * 1.6}rem`,
            }}
          />
        </div>

        {/* Fake Terminal / Console Output */}
        {terminalMsg && (
          <div
            className={`px-4 py-2 border-t ${ui.border} ${
              darkMode
                ? "bg-[#111] text-emerald-400"
                : "bg-neutral-100 text-emerald-600"
            } font-mono text-[11px] flex items-center gap-2 animate-fade-up`}
          >
            <FiTerminal className="shrink-0" />
            <span className="truncate">{terminalMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
