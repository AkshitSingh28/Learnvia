"use client";

/**
 * Reusable Growvia chat surface on the charcoal "AI console" theme — the shared
 * paradigm behind the Prompt Lab and the Growvia Coach. Centered greeting + starters when empty,
 * then a streaming message thread with a single input bar (clay send). When the daily cap is
 * exhausted it flips to the copy-into-your-own-AI fallback. Enforces the per-user daily cap via
 * `useStudent()` so callers stay thin.
 */
import { useEffect, useRef, useState } from "react";
import { streamMessage, type ChatTurn } from "@/lib/ai/gemini";
import { useStudent } from "@/lib/data/DataProvider";
import { ExternalAiFallback } from "@/components/ai/ExternalAiFallback";
import { AiUsageMeter } from "@/components/ai/AiUsageMeter";

/** A message as exposed to callers (for persistence). Transient error bubbles are not persisted. */
export interface ChatMessage {
  role: "user" | "model";
  text: string;
  error?: boolean;
}

type Msg = ChatMessage;

export interface ChatSurfaceProps {
  systemInstruction?: string;
  greeting?: string;
  subGreeting?: string;
  starters?: string[];
  placeholder?: string;
  /** Prior messages to seed the thread with (e.g. loaded from Firestore). Read once at mount. */
  initialMessages?: ChatMessage[];
  /** Called after each completed turn with the full message list — persist the successful ones. */
  onMessagesChange?: (messages: ChatMessage[]) => void;
  /** Called after a completed exchange (user text + full model reply) — e.g. to enable "save". */
  onExchange?: (userText: string, modelText: string) => void;
}

/** Clay-tinted spark badge used for the empty state + model bubbles. */
function Spark({ size = 44 }: { size?: number }) {
  return (
    <span style={{ display: "grid", placeItems: "center", width: size, height: size, borderRadius: size * 0.28, flexShrink: 0, background: "var(--aic-clay-tint)", color: "var(--aic-clay-soft)" }}>
      <i className="ti ti-sparkles" style={{ fontSize: size * 0.5 }} aria-hidden="true" />
    </span>
  );
}

export function ChatSurface({ systemInstruction, greeting, subGreeting, starters = [], placeholder = "Type a message…", initialMessages, onMessagesChange, onExchange }: ChatSurfaceProps) {
  const { aiRemaining, recordAiUse } = useStudent();
  const [messages, setMessages] = useState<Msg[]>(() => initialMessages ?? []);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  const capReached = aiRemaining <= 0;

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy || capReached) return;
    const base = messages.filter((m) => !m.error);
    const history: ChatTurn[] = base.map((m) => ({ role: m.role, text: m.text }));
    const userMsg: Msg = { role: "user", text: trimmed };
    setMessages([...base, userMsg, { role: "model", text: "" }]);
    setInput("");
    setBusy(true);
    await recordAiUse();
    let acc = "";
    try {
      for await (const chunk of streamMessage(history, trimmed, systemInstruction)) {
        acc += chunk;
        setMessages([...base, userMsg, { role: "model", text: acc }]);
      }
      onExchange?.(trimmed, acc);
      onMessagesChange?.([...base, userMsg, { role: "model", text: acc }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong talking to the AI. Please try again.";
      setMessages([...base, userMsg, { role: "model", text: msg, error: true }]);
    } finally {
      setBusy(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="aic flex flex-col" style={{ minHeight: 480 }}>
      {/* Thread / greeting */}
      <div ref={threadRef} className="flex-1 overflow-y-auto p-5" style={{ maxHeight: 580 }}>
        {empty ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <Spark size={52} />
            <h2 className="mt-4 text-xl font-semibold tracking-tight" style={{ color: "var(--aic-text)" }}>{greeting ?? "Ask away"}</h2>
            {subGreeting && <p className="mt-1.5 text-sm max-w-md" style={{ color: "var(--aic-muted)" }}>{subGreeting}</p>}
            {starters.length > 0 && (
              <div className="mt-6 grid gap-2 w-full max-w-md">
                {starters.slice(0, 4).map((s) => (
                  <button key={s} onClick={() => send(s)} disabled={busy || capReached}
                    className="aic-field text-left px-3.5 py-2.5 text-sm transition-colors disabled:opacity-50"
                    style={{ color: "var(--aic-muted)" }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
                {m.role === "model" && <Spark size={30} />}
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap"
                  style={
                    m.role === "user"
                      ? { background: "var(--aic-clay)", color: "var(--aic-clay-on)" }
                      : { background: "var(--aic-surface)", color: m.error ? "#6FB0F2" /* blue error text (was warm #E88B6B) */ : "#DCD8CE", border: "1px solid var(--aic-line)", lineHeight: 1.6 }
                  }
                >
                  {m.text || (busy ? <span className="aic-caret" /> : "")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-3" style={{ borderTop: "1px solid var(--aic-line)" }}>
        {capReached ? (
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder={placeholder}
              className="aic-field w-full px-3.5 py-2.5 text-sm mb-2.5 outline-none resize-none"
            />
            <ExternalAiFallback prompt={input} showPrompt={false} note="You've used your in-app AI runs for today — paste your message into your own free ChatGPT or Gemini. Your runs free up over the next day." />
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              rows={1}
              placeholder={placeholder}
              className="aic-field flex-1 resize-none px-3.5 py-2.5 text-sm outline-none"
              style={{ maxHeight: 140 }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || busy}
              aria-label="Send"
              className="aic-btn aic-clay grid place-items-center"
              style={{ width: 42, height: 42, flexShrink: 0, padding: 0 }}
            >
              <i className={`ti ${busy ? "ti-loader-2 animate-spin" : "ti-arrow-up"}`} style={{ fontSize: 18 }} aria-hidden="true" />
            </button>
          </div>
        )}
        <AiUsageMeter className="mt-2 px-1" />
        <div className="mt-1.5 px-1 text-[11px]" style={{ color: "var(--aic-faint)" }}>
          AI can make mistakes — double-check important info.
        </div>
      </div>
    </div>
  );
}
