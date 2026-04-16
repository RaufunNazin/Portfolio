import { useState, useRef, useEffect } from "react";
import { FiRotateCcw, FiPlay } from "react-icons/fi";

export default function TerminalContact({
  ui,
  darkMode,
  copyToClipboard,
  copiedKey,
}) {
  const initialHistory = [
    { id: 1, type: "input", text: "init --fetch contact-details" },
    { id: 2, type: "system", text: "[OK] Connecting to server..." },
    { id: 3, type: "contact" },
  ];

  const [history, setHistory] = useState(initialHistory);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const endOfTerminalRef = useRef(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (endOfTerminalRef.current) {
      endOfTerminalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [
      ...history,
      { id: Date.now(), type: "input", text: trimmed },
    ];
    const args = trimmed.split(" ");
    const baseCmd = args[0].toLowerCase();

    let output = null;

    switch (baseCmd) {
      case "clear":
        setHistory([]);
        return;
      case "help":
        output =
          "Available commands: help, clear, fetch, ls, pwd, date, echo, whoami, uname, history, ping, sudo";
        break;
      case "fetch":
      case "./contact.sh":
        output = { type: "contact" };
        break;
      case "ls":
        output =
          "contact.sh   resume.pdf   top_secret_passwords.txt   src/   public/";
        break;
      case "cat":
        if (args[1] === "top_secret_passwords.txt") {
          output = "hunter2\npassword123\nadmin";
        } else if (args[1] === "resume.pdf") {
          output =
            "Error: Cannot display PDF in text terminal. Please click the 'Resume' button in the header.";
        } else if (args[1]) {
          output = `cat: ${args[1]}: No such file or directory`;
        } else {
          output = "cat: missing file operand";
        }
        break;
      case "whoami":
        output = "probably a good person... right? 🤔";
        break;
      case "pwd":
        output = "/home/visitor/portfolio/contact";
        break;
      case "date":
        output = new Date().toString();
        break;
      case "echo":
        output = args.slice(1).join(" ");
        break;
      case "uname":
        output = args.includes("-a")
          ? "Linux dev-server 5.15.0-104-generic #114-Ubuntu SMP Wed Mar 25 15:22:24 UTC 2026 x86_64 x86_64 x86_64 GNU/Linux"
          : "Linux";
        break;
      case "history":
        // Show typed history with line numbers
        output = newHistory
          .filter((h) => h.type === "input")
          .map((h, i) => `  ${i + 1}  ${h.text}`)
          .join("\n");
        break;
      case "sudo":
        if (args[1] === "rm" && args[2] === "-rf" && args[3] === "/") {
          output =
            "bash: permission denied. Please don't delete my portfolio, I worked hard on it 😅";
        } else {
          output =
            "current user is not in the sudoers file. This incident will be reported to Srizon.";
        }
        break;
      case "rm":
        output = "rm: permission denied";
        break;
      case "ping":
        output = "PONG! 🏓";
        break;
      case "cd":
      case "mkdir":
      case "touch":
      case "nano":
      case "vim":
        output = "bash: permission denied.";
        break;
      default:
        output = `bash: ${baseCmd}: command not found. Type 'help' for available commands.`;
    }

    if (output) {
      if (typeof output === "string") {
        newHistory.push({ id: Date.now() + 1, type: "output", text: output });
      } else {
        newHistory.push({ id: Date.now() + 1, ...output });
      }
    }

    setHistory(newHistory);
  };

  const handleRestore = () => {
    setHistory(initialHistory);
  };

  const handleRun = () => {
    const funCommands = [
      "ls",
      "date",
      "uname -a",
      "whoami",
      "cat top_secret_passwords.txt",
      "sudo rm -rf /",
    ];
    const randomCmd =
      funCommands[Math.floor(Math.random() * funCommands.length)];
    handleCommand(randomCmd);
  };

  // FIX: This stops the hidden SnakeGame from stealing your keys!
  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }

    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <section
      className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 mt-10 sm:mt-12 pb-10"
      id="contact-section"
      data-reveal
    >
      <div
        className={`rounded-3xl border ${ui.border} ${
          darkMode ? "bg-[#0d0d0d]" : "bg-[#f8f9fa]"
        } shadow-xl overflow-hidden flex flex-col h-[500px] lg:h-[500px]`}
      >
        {/* Terminal Window Chrome */}
        <div
          className={`px-5 py-3 border-b ${ui.border} ${
            darkMode ? "bg-neutral-900" : "bg-white"
          } flex items-center justify-between shrink-0`}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className={`text-xs font-mono opacity-50`}>~/contact.sh</div>

          {/* Window Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleRestore}
              title="Restore Terminal"
              className={`p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${ui.subtext} hover:text-cyan-500 cursor-pointer`}
            >
              <FiRotateCcw size={14} />
            </button>
            <button
              onClick={handleRun}
              title="Run Random Command"
              className={`p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${ui.subtext} hover:text-emerald-500 cursor-pointer`}
            >
              <FiPlay size={14} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className="p-6 sm:p-8 lg:p-10 font-mono text-sm sm:text-base overflow-y-auto flex-1 cursor-text scroll-smooth"
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          <div className="flex flex-col gap-4">
            {history.map((item) => (
              <div key={item.id}>
                {item.type === "input" && (
                  <div>
                    <span className="text-emerald-500 font-semibold">
                      &gt;{" "}
                    </span>
                    <span className="opacity-90">{item.text}</span>
                  </div>
                )}

                {item.type === "system" && (
                  <div className="opacity-70 mt-2">{item.text}</div>
                )}

                {item.type === "output" && (
                  <div className="opacity-80 mt-2 whitespace-pre-wrap leading-relaxed">
                    {item.text}
                  </div>
                )}

                {item.type === "contact" && (
                  <div className="flex flex-col gap-4 pl-4 border-l-2 border-emerald-500/20 my-4 py-2 animate-fade-up">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="w-24 opacity-50">EMAIL:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents focusing the terminal input
                          copyToClipboard(
                            "raufun.nazin13@gmail.com",
                            "contact-email",
                          );
                        }}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        raufun.nazin13@gmail.com
                        <span className="text-xs opacity-50 bg-cyan-500/10 px-2 py-0.5 rounded">
                          {copiedKey === "contact-email" ? "COPIED" : "COPY"}
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <span className="w-24 opacity-50">PHONE:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard("+8801682386618", "contact-phone");
                        }}
                        className="text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        +880-1682-386618
                        <span className="text-xs opacity-50 bg-violet-500/10 px-2 py-0.5 rounded">
                          {copiedKey === "contact-phone" ? "COPIED" : "COPY"}
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <span className="w-24 opacity-50">LOCATION:</span>
                      <span className="opacity-90">Dhaka, Bangladesh</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Active Input Prompt */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-emerald-500 font-semibold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown} // Apply the fix here
                autoComplete="off"
                spellCheck="false"
                className="flex-1 bg-transparent outline-none border-none text-inherit font-mono w-full"
                autoFocus
              />
            </div>

            {/* Invisible element to anchor the auto-scroll */}
            <div ref={endOfTerminalRef} />
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t ${ui.border} text-xs ${ui.subtext} flex justify-between items-center shrink-0`}
        >
          <span>v2.0</span>
          <span>2025 &copy; Raufun Nazin Srizon</span>
        </div>
      </div>
    </section>
  );
}
