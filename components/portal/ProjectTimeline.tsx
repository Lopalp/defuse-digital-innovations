import type { Milestone } from "@/lib/portal/types";
import { Check } from "lucide-react";

export function ProjectTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="space-y-0">
      {milestones.map((m, i) => {
        const isLast = i === milestones.length - 1;
        const done = m.status === "Erledigt";
        const active = m.status === "In Arbeit";

        return (
          <div key={m.id} className="flex gap-3">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  done
                    ? "bg-gray-900 text-white"
                    : active
                    ? "bg-gray-900 text-white ring-2 ring-gray-200"
                    : "border-2 border-gray-200 bg-white"
                }`}
              >
                {done ? (
                  <Check className="w-3 h-3" strokeWidth={2.5} />
                ) : active ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                )}
              </div>
              {!isLast && (
                <div
                  className={`w-px flex-1 min-h-[32px] ${
                    done ? "bg-gray-900" : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-6 pt-0.5">
              <p
                className={`text-sm font-medium ${
                  done
                    ? "text-gray-900"
                    : active
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {m.name}
              </p>
              {m.date && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(m.date).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
