"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { id: string; from: "user" | "bot"; text: string };

function id() {
  return Math.random().toString(36).slice(2, 9);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: id(), from: "bot", text: "Hi — I'm SafeBot. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // keep newest visible
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function pushUser(text: string) {
    const m: Msg = { id: id(), from: "user", text };
    setMessages((s) => [...s, m]);
    simulateBotReply(text);
  }

  function simulateBotReply(userText: string) {
    setTyping(true);
    // simple canned replies; replace with real AI/api if desired
    const reply = (() => {
      const t = userText.toLowerCase();
      if (t.includes("price") || t.includes("pricing")) return "You can find our pricing page here: /pricing — would you like me to send a quick summary?";
      if (t.includes("demo") || t.includes("trial")) return "We offer demos. Share your preferred time and timezone and we'll schedule one.";
      if (t.includes("support") || t.includes("help")) return "Our support team is available Mon–Fri. Would you like to create a ticket?";
      return "Thanks — a human will follow up if needed. Would you like contact details or a demo?";
    })();

    setTimeout(() => {
      setTyping(false);
      setMessages((s) => [...s, { id: id(), from: "bot", text: reply }]);
    }, 900 + Math.random() * 900);
  }

  return (
    <>
      <div className="fixed right-4 bottom-6 z-50">
        <div className="flex flex-col items-end">
          {open && (
            <div className="w-[320px] max-w-[90vw] bg-white rounded-xl shadow-lg overflow-hidden mb-3">
              <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                <div className="text-sm font-semibold">SafeBot</div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 rounded p-1"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>

              <div ref={listRef} className="h-64 overflow-auto p-3 space-y-3 bg-gray-50">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${m.from === "user" ? "bg-orange-500 text-black" : "bg-white text-gray-800 shadow"}`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex justify-start">
                    <div className="bg-white px-3 py-2 rounded-lg shadow text-sm flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-225" />
                      <span className="ml-2 text-xs text-gray-500">typing…</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && input.trim()) {
                        pushUser(input.trim());
                        setInput("");
                      }
                    }}
                    placeholder="Ask a question or type 'demo'"
                    className="flex-1 rounded-md border px-3 py-2 focus:ring-2 focus:ring-orange-200"
                    aria-label="Chat message"
                  />
                  <button
                    onClick={() => {
                      if (!input.trim()) return;
                      pushUser(input.trim());
                      setInput("");
                    }}
                    className="inline-flex items-center justify-center bg-orange-500 text-black px-3 py-2 rounded-md font-semibold"
                    style={{ color: "#000" }}
                  >
                    Send
                  </button>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      pushUser("I want pricing");
                    }}
                    className="text-xs px-3 py-1 rounded-md bg-gray-100"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => {
                      pushUser("I need support");
                    }}
                    className="text-xs px-3 py-1 rounded-md bg-gray-100"
                  >
                    Support
                  </button>
                  <button
                    onClick={() => {
                      pushUser("I want a demo");
                    }}
                    className="text-xs px-3 py-1 rounded-md bg-gray-100"
                  >
                    Demo
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setOpen((s) => !s)}
            className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold"
            style={{ color: "#000" }}
            aria-expanded={open}
            aria-controls="chat-widget"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Chat
          </button>
        </div>
      </div>
    </>
  );
}