"use client";

import { useState, useEffect } from "react";
import { LifeBuoy, Plus, Send } from "lucide-react";
import { EmptyState } from "@/components/portal/EmptyState";
import type { Ticket, TicketPriority } from "@/lib/portal/types";

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Normal");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/portal/support")
      .then((r) => r.json())
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSending(true);
    await fetch("/api/portal/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
        priority,
      }),
    });

    setTitle("");
    setDescription("");
    setPriority("Normal");
    setShowForm(false);
    setSending(false);

    const res = await fetch("/api/portal/support");
    setTickets(await res.json());
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Support
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Erstellen und verfolgen Sie Support-Anfragen.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Neues Ticket
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 md:p-8 mb-8"
        >
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all mb-4"
            required
          />

          <textarea
            placeholder="Beschreiben Sie Ihr Anliegen..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all resize-none mb-5"
            required
          />

          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-3">Priorität</p>
            <div className="flex gap-2">
              {(
                ["Niedrig", "Normal", "Hoch", "Dringend"] as TicketPriority[]
              ).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    priority === p
                      ? "bg-gray-900 text-white"
                      : "bg-[#f5f5f7] text-gray-500 hover:bg-gray-200/60"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {sending ? "Wird erstellt..." : "Ticket erstellen"}
            </button>
          </div>
        </form>
      )}

      {/* Tickets */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] divide-y divide-gray-100/80">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-6 md:px-8 py-5 md:py-6 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-50 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState
          icon={LifeBuoy}
          title="Keine Tickets vorhanden"
          description="Erstellen Sie ein Ticket, wenn Sie Hilfe benötigen."
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] divide-y divide-gray-100/80 overflow-hidden">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="px-6 md:px-8 py-5 md:py-6">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-base font-semibold text-gray-900">
                  {ticket.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{ticket.priority}</span>
                  <span>{ticket.status}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-1 mb-1.5">
                {ticket.description}
              </p>
              <p className="text-xs text-gray-400">
                {formatDate(ticket.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
