"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Send, MessageSquare, Check, CheckCheck } from "lucide-react";
import type { Message } from "@/lib/portal/types";

// Group consecutive messages from the same sender
interface MessageGroup {
  sender: "Kunde" | "Team";
  messages: Message[];
}

function groupConsecutive(messages: Message[]): { date: string; groups: MessageGroup[] }[] {
  const days: { date: string; groups: MessageGroup[] }[] = [];

  messages.forEach((msg) => {
    const dateKey = new Date(msg.createdAt).toDateString();
    let day = days.find((d) => d.date === dateKey);
    if (!day) {
      day = { date: dateKey, groups: [] };
      days.push(day);
    }

    const lastGroup = day.groups[day.groups.length - 1];
    if (lastGroup && lastGroup.sender === msg.sender) {
      lastGroup.messages.push(msg);
    } else {
      day.groups.push({ sender: msg.sender, messages: [msg] });
    }
  });

  return days;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const res = await fetch("/api/portal/nachrichten");
    setMessages(await res.json());
  };

  useEffect(() => {
    fetchMessages().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    // Optimistic: add message immediately
    const optimistic: Message = {
      id: `temp-${Date.now()}`,
      subject: "Chat",
      body: text,
      sender: "Kunde",
      customerId: "",
      projectId: null,
      createdAt: new Date().toISOString(),
      read: true,
      type: "Sonstiges",
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");
    setSending(true);

    await fetch("/api/portal/nachrichten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: "Chat", body: text }),
    });

    await fetchMessages();
    setSending(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-grow textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

  const formatDateSeparator = (dateStr: string) => {
    const d = new Date(dateStr);
    const diffDays = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (diffDays === 0) return "Heute";
    if (diffDays === 1) return "Gestern";
    return d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
  };

  const grouped = useMemo(() => groupConsecutive(messages), [messages]);

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 12rem)" }}>
      {/* Chat body */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      >
        {/* Chat header inside the card */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 32 32" fill="none">
                <path d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">defuse digital</p>
              <p className="text-xs text-gray-400">
                Antwortzeit: in der Regel wenige Stunden
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="px-8 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse [animation-delay:150ms]" />
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse [animation-delay:300ms]" />
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-32">
              <div className="w-20 h-20 rounded-full bg-[#f5f5f7] flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-xl font-semibold text-gray-900 mb-2">Starten Sie das Gespräch</p>
              <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                Schreiben Sie uns eine Nachricht — egal ob Frage, Feedback oder Idee.
                Wir freuen uns von Ihnen zu hören.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {grouped.map((day, dayIdx) => (
                <div key={day.date}>
                  {/* Date */}
                  <div className="flex justify-center my-8">
                    <span className="text-[11px] font-medium text-gray-400 bg-[#f5f5f7] px-4 py-1.5 rounded-full">
                      {formatDateSeparator(day.groups[0].messages[0].createdAt)}
                    </span>
                  </div>

                  {/* Message groups */}
                  {day.groups.map((group, groupIdx) => {
                    const isMe = group.sender === "Kunde";
                    return (
                      <div
                        key={`${dayIdx}-${groupIdx}`}
                        className={`flex mb-6 ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        {/* Team avatar — only once per group */}
                        {!isMe && (
                          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mr-2.5 self-end mb-1">
                            <svg className="w-3 h-3 text-white" viewBox="0 0 32 32" fill="none">
                              <path d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z" fill="currentColor"/>
                            </svg>
                          </div>
                        )}

                        <div className="max-w-[65%] space-y-0.5">
                          {group.messages.map((msg, msgIdx) => {
                            const isFirst = msgIdx === 0;
                            const isLast = msgIdx === group.messages.length - 1;

                            // Bubble radius: first gets top corners, last gets bottom corner on sender side
                            let radius = "rounded-2xl";
                            if (group.messages.length > 1) {
                              if (isMe) {
                                if (isFirst) radius = "rounded-2xl rounded-br-md";
                                else if (isLast) radius = "rounded-2xl rounded-tr-md";
                                else radius = "rounded-2xl rounded-r-md";
                              } else {
                                if (isFirst) radius = "rounded-2xl rounded-bl-md";
                                else if (isLast) radius = "rounded-2xl rounded-tl-md";
                                else radius = "rounded-2xl rounded-l-md";
                              }
                            } else {
                              radius = isMe ? "rounded-2xl rounded-br-md" : "rounded-2xl rounded-bl-md";
                            }

                            return (
                              <div
                                key={msg.id}
                                className={`${radius} px-4 py-2.5 ${
                                  isMe
                                    ? "bg-gray-900 text-white"
                                    : "bg-[#f0f0f2] text-gray-900"
                                }`}
                              >
                                {msg.subject !== "Chat" && isFirst && (
                                  <p className={`text-[11px] font-semibold mb-1 ${isMe ? "text-white/40" : "text-gray-400"}`}>
                                    {msg.subject}
                                  </p>
                                )}
                                <p className="text-[15px] leading-[1.55] whitespace-pre-wrap">
                                  {msg.body}
                                </p>
                              </div>
                            );
                          })}

                          {/* Time + status — once per group, after last message */}
                          <div className={`flex items-center gap-1.5 px-1 pt-1 ${isMe ? "justify-end" : "justify-start"}`}>
                            <span className="text-[11px] text-gray-300">
                              {formatTime(group.messages[group.messages.length - 1].createdAt)}
                            </span>
                            {isMe && (
                              <CheckCheck className="w-3.5 h-3.5 text-gray-300" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="pt-4 shrink-0">
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-3 flex items-end gap-3">
          <div className="flex-1 px-4 py-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Nachricht schreiben..."
              rows={1}
              className="w-full text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none resize-none bg-transparent leading-snug"
              style={{ minHeight: "24px", maxHeight: "160px" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className={`p-3 rounded-xl shrink-0 transition-all duration-200 ${
              input.trim()
                ? "bg-gray-900 text-white hover:bg-gray-800 scale-100"
                : "bg-gray-100 text-gray-300 scale-95"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-300 mt-3">
          Enter senden · Shift+Enter neue Zeile
        </p>
      </div>
    </div>
  );
}
