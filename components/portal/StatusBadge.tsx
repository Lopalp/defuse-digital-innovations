const STATUS_STYLES: Record<string, string> = {
  Anfrage: "text-gray-500",
  Planung: "text-blue-600",
  Design: "text-purple-600",
  Entwicklung: "text-orange-600",
  Testing: "text-yellow-700",
  Live: "text-green-600",
  Abgeschlossen: "text-gray-400",
  Offen: "text-blue-600",
  "In Arbeit": "text-orange-600",
  "In Bearbeitung": "text-orange-600",
  Erledigt: "text-green-600",
  "Warten auf Antwort": "text-yellow-700",
  Geschlossen: "text-gray-400",
  Niedrig: "text-gray-400",
  Normal: "text-gray-500",
  Hoch: "text-orange-600",
  Dringend: "text-red-600",
};

const STATUS_DOTS: Record<string, string> = {
  Anfrage: "bg-gray-400",
  Planung: "bg-blue-500",
  Design: "bg-purple-500",
  Entwicklung: "bg-orange-500",
  Testing: "bg-yellow-500",
  Live: "bg-green-500",
  Abgeschlossen: "bg-gray-300",
  Offen: "bg-blue-500",
  "In Arbeit": "bg-orange-500",
  "In Bearbeitung": "bg-orange-500",
  Erledigt: "bg-green-500",
  "Warten auf Antwort": "bg-yellow-500",
  Geschlossen: "bg-gray-300",
  Niedrig: "bg-gray-300",
  Normal: "bg-gray-400",
  Hoch: "bg-orange-500",
  Dringend: "bg-red-500",
};

export function StatusBadge({ status }: { status: string }) {
  const textStyle = STATUS_STYLES[status] ?? "text-gray-500";
  const dotStyle = STATUS_DOTS[status] ?? "bg-gray-400";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${textStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
      {status}
    </span>
  );
}
