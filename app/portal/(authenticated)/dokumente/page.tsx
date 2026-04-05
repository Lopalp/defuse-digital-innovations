"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Download, ExternalLink, Check, Receipt, Eye } from "lucide-react";
import { EmptyState } from "@/components/portal/EmptyState";
import { Modal } from "@/components/portal/Modal";
import type { Document, Invoice } from "@/lib/portal/types";

export default function DokumentePage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [avvSigned, setAvvSigned] = useState(false);
  const [avvDate, setAvvDate] = useState<string | null>(null);
  const [modalInvoice, setModalInvoice] = useState<Invoice | null>(null);
  const [activeTab, setActiveTab] = useState<"docs" | "invoices">("docs");

  useEffect(() => {
    Promise.all([
      fetch("/api/portal/dokumente").then((r) => r.json()),
      fetch("/api/portal/rechnungen").then((r) => r.json()),
      fetch("/api/portal/auth/session").then((r) => r.json()),
    ]).then(([docs, invs, session]) => {
      setDocuments(docs);
      setInvoices(invs);
      setLoading(false);
    });
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }) : "—";

  const statusColor: Record<string, string> = {
    Bezahlt: "text-green-600",
    Gesendet: "text-orange-500",
    Entwurf: "text-gray-400",
    "Überfällig": "text-red-500",
  };

  const totalOpen = invoices
    .filter((i) => i.status !== "Bezahlt" && i.status !== "Entwurf")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Dokumente & Rechnungen
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Verträge, Projektdokumente und Ihre Rechnungsübersicht.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-200/60 rounded-xl p-1 mb-10 w-fit">
        <button
          onClick={() => setActiveTab("docs")}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "docs" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Dokumente
        </button>
        <button
          onClick={() => setActiveTab("invoices")}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "invoices" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Rechnungen
          {invoices.filter((i) => i.status === "Gesendet").length > 0 && (
            <span className="w-2 h-2 rounded-full bg-orange-400" />
          )}
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8 md:p-10 animate-pulse">
          <div className="h-4 bg-gray-100 rounded w-1/3 mb-5" />
          <div className="h-3 bg-gray-50 rounded w-2/3" />
        </div>
      ) : activeTab === "docs" ? (
        <>
          {/* Contracts */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verträge</h2>
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] divide-y divide-gray-100/80">
              <div className="flex items-center gap-4 px-6 md:px-8 py-5 md:py-6">
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900">Auftragsverarbeitungsvereinbarung (AVV)</p>
                  <p className="text-xs text-gray-400 mt-1">DSGVO · Art. 28</p>
                </div>
                <Link
                  href="/portal/dokumente/avv"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 text-xs font-medium text-gray-600 hover:bg-gray-200/80 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ansehen
                </Link>
              </div>
              <div className="flex items-center gap-4 px-6 md:px-8 py-5 md:py-6">
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900">Service Agreement</p>
                  <p className="text-xs text-gray-400 mt-1">Leistungsumfang & SLAs</p>
                </div>
                <a
                  href="/dokumente/service-agreement.pdf"
                  download
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 text-xs font-medium text-gray-600 hover:bg-gray-200/80 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  PDF
                </a>
              </div>
            </div>
          </div>

          {/* Project Documents */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Projektdokumente</h2>
            {documents.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="Keine Projektdokumente"
                description="Dokumente erscheinen hier, sobald sie bereitgestellt werden."
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] divide-y divide-gray-100/80">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 px-6 md:px-8 py-5 md:py-6">
                    <div className="flex-1">
                      <p className="text-base font-semibold text-gray-900">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{doc.category}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(doc.createdAt).toLocaleDateString("de-DE")}
                        </span>
                      </div>
                    </div>
                    {doc.fileUrl && (
                      <a
                        href={`/api/portal/dokumente/download?id=${doc.id}`}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 text-xs font-medium text-gray-600 hover:bg-gray-200/80 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Invoice Summary */}
          {totalOpen > 0 && (
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 md:p-8 mb-8">
              <p className="text-xs text-gray-400 mb-1">Offener Betrag</p>
              <p className="text-3xl font-bold tracking-tight text-gray-900">
                {formatCurrency(totalOpen)}
              </p>
            </div>
          )}

          {/* Invoices */}
          {invoices.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="Keine Rechnungen"
              description="Rechnungen erscheinen hier, sobald sie erstellt werden."
            />
          ) : (
            <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] divide-y divide-gray-100/80">
              {invoices.map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => setModalInvoice(inv)}
                  className="flex items-center gap-5 px-6 md:px-8 py-5 md:py-6 w-full text-left hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <p className="text-base font-semibold text-gray-900">{inv.name}</p>
                      {inv.invoiceNo && (
                        <span className="text-xs text-gray-400">#{inv.invoiceNo}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {inv.project || "Kein Projekt"} · {formatDate(inv.issueDate)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base font-bold text-gray-900 tabular-nums">
                      {formatCurrency(inv.amount)}
                    </p>
                    <p className={`text-xs font-medium mt-0.5 ${statusColor[inv.status] ?? "text-gray-400"}`}>
                      {inv.status}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Invoice Modal — full invoice document view */}
      <Modal
        open={!!modalInvoice}
        onClose={() => setModalInvoice(null)}
        title=""
      >
        {modalInvoice && (
          <div>
            {/* Invoice document */}
            <div className="bg-white" id="invoice-view">
              {/* Header */}
              <div className="flex items-start justify-between mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                      <path d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z" fill="currentColor"/>
                    </svg>
                    <span className="text-sm font-headline font-bold tracking-tighter">defuse digital</span>
                  </div>
                  <div className="text-xs text-gray-400 leading-relaxed">
                    <p>LUCRAM MEDIA GmbH</p>
                    <p>Alte Chemnitzer Straße 4</p>
                    <p>09573 Augustusburg</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold tracking-tight text-gray-900 mb-1">RECHNUNG</p>
                  <p className="text-sm text-gray-400">{modalInvoice.invoiceNo ? `#${modalInvoice.invoiceNo}` : ""}</p>
                </div>
              </div>

              {/* Status badge */}
              <div className="mb-8">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
                  modalInvoice.status === "Bezahlt" ? "bg-green-50 text-green-700" :
                  modalInvoice.status === "Gesendet" ? "bg-orange-50 text-orange-700" :
                  modalInvoice.status === "Überfällig" ? "bg-red-50 text-red-700" :
                  "bg-gray-100 text-gray-500"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    modalInvoice.status === "Bezahlt" ? "bg-green-500" :
                    modalInvoice.status === "Gesendet" ? "bg-orange-500" :
                    modalInvoice.status === "Überfällig" ? "bg-red-500" :
                    "bg-gray-400"
                  }`} />
                  {modalInvoice.status}
                </span>
              </div>

              {/* Client + dates */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Rechnungsempfänger</p>
                  <p className="text-sm font-semibold text-gray-900">{modalInvoice.client}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Datum</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(modalInvoice.issueDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Fällig am</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(modalInvoice.dueDate)}</p>
                  </div>
                </div>
              </div>

              {/* Line items table */}
              <div className="mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs text-gray-400 font-medium pb-3">Beschreibung</th>
                      <th className="text-right text-xs text-gray-400 font-medium pb-3">Betrag</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4">
                        <p className="text-sm font-medium text-gray-900">{modalInvoice.name}</p>
                        {modalInvoice.project && (
                          <p className="text-xs text-gray-400 mt-0.5">Projekt: {modalInvoice.project}</p>
                        )}
                      </td>
                      <td className="text-right py-4">
                        <p className="text-sm font-medium text-gray-900 tabular-nums">{formatCurrency(modalInvoice.amount)}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-10">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-400">Netto</span>
                    <span className="text-sm text-gray-900 tabular-nums">{formatCurrency(modalInvoice.amount / 1.19)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-400">USt. 19%</span>
                    <span className="text-sm text-gray-900 tabular-nums">{formatCurrency(modalInvoice.amount - modalInvoice.amount / 1.19)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 border-gray-900 mt-1">
                    <span className="text-sm font-bold text-gray-900">Gesamt</span>
                    <span className="text-lg font-bold text-gray-900 tabular-nums">{formatCurrency(modalInvoice.amount)}</span>
                  </div>
                </div>
              </div>

              {/* Payment info */}
              {modalInvoice.status !== "Bezahlt" && (
                <div className="bg-[#f5f5f7] rounded-xl p-5">
                  <p className="text-xs text-gray-400 mb-2">Bankverbindung</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Empfänger</p>
                      <p className="font-medium text-gray-900">LUCRAM MEDIA GmbH</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Verwendungszweck</p>
                      <p className="font-medium text-gray-900">{modalInvoice.invoiceNo || modalInvoice.name}</p>
                    </div>
                  </div>
                </div>
              )}

              {modalInvoice.status === "Bezahlt" && (
                <div className="bg-green-50 rounded-xl p-5 text-center">
                  <p className="text-sm font-medium text-green-700">
                    Diese Rechnung wurde beglichen. Vielen Dank!
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  const el = document.getElementById("invoice-view");
                  if (el) {
                    const w = window.open("", "_blank");
                    if (w) {
                      w.document.write(`<html><head><title>Rechnung ${modalInvoice.invoiceNo || ""}</title><style>body{font-family:-apple-system,sans-serif;padding:40px;color:#101828}table{width:100%;border-collapse:collapse}th,td{padding:12px 0;text-align:left}th{border-bottom:1px solid #e5e7eb;font-size:12px;color:#99a1af}td{border-bottom:1px solid #f3f4f6;font-size:14px}.right{text-align:right}</style></head><body>${el.innerHTML}</body></html>`);
                      w.document.close();
                      w.print();
                    }
                  }
                }}
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
              >
                Als PDF drucken
              </button>
              <Link
                href="/portal/nachrichten"
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
                onClick={() => setModalInvoice(null)}
              >
                Frage zu dieser Rechnung?
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
