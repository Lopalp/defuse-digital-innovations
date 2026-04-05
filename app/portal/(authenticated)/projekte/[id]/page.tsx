import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/portal/session";
import {
  getProject,
  getMilestonesForProject,
  calculateProgress,
} from "@/lib/portal/notion";
import { ProgressBar } from "@/components/portal/ProgressBar";
import { ProjectTimeline } from "@/components/portal/ProjectTimeline";
import {
  ArrowLeft,
  MessageSquare,
  LifeBuoy,
  FileText,
  Check,
  Zap,
  Calendar,
  TrendingUp,
  Activity,
} from "lucide-react";

const PROCESS_STEPS = [
  "Anfrage",
  "Planung",
  "Design",
  "Entwicklung",
  "Testing",
  "Live",
];

const STATUS_TO_STEP: Record<string, number> = {
  Anfrage: 0,
  Planung: 1,
  Design: 2,
  Entwicklung: 3,
  Testing: 4,
  Live: 5,
  Abgeschlossen: 6,
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  const { id } = await params;

  const project = await getProject(id);
  if (!project || project.customerId !== session.customerId) {
    notFound();
  }

  const milestones = await getMilestonesForProject(id);
  const progress = calculateProgress(milestones);
  const currentStep = STATUS_TO_STEP[project.status] ?? 0;

  return (
    <>
      <Link
        href="/portal/projekte"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Alle Projekte
      </Link>

      {/* Dramatic Hero Banner with paint texture */}
      <div className="relative rounded-2xl overflow-hidden mb-12" style={{ minHeight: "340px" }}>
        <Image
          src="/portal-paint.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1100px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-gray-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/40 to-transparent" />

        {/* Project info overlay */}
        <div className="relative z-10 p-10 md:p-12 flex flex-col justify-end h-full" style={{ minHeight: "280px" }}>
          <p className="text-xs text-white/40 mb-3 tracking-wide uppercase">{project.type} · {project.status}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-3">
            {project.name}
          </h1>
          {project.description && (
            <p className="text-sm text-white/50 max-w-xl leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* Frosted glass stats bar at bottom */}
        <div className="absolute bottom-0 inset-x-0 z-20">
          <div className="mx-5 mb-5 rounded-xl backdrop-blur-xl bg-white/10 border border-white/10 px-8 py-4">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-white/50" />
                <span className="text-xs text-white/50">Fortschritt</span>
                <span className="text-sm font-bold text-white tabular-nums">{progress}%</span>
              </div>
              {project.endDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-white/50" />
                  <span className="text-xs text-white/50">Deadline</span>
                  <span className="text-sm font-medium text-white">
                    {new Date(project.endDate).toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-white/50" />
                <span className="text-xs text-white/50">Status</span>
                <span className="text-sm font-medium text-white">{project.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big progress */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8 md:p-10 mb-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">Gesamtfortschritt</p>
            <p className="text-5xl font-bold tracking-tight text-gray-900 tabular-nums">
              {progress}<span className="text-2xl text-gray-300 ml-1">%</span>
            </p>
          </div>
          {project.endDate && (
            <div className="text-right">
              <p className="text-xs text-gray-400">Deadline</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">
                {new Date(project.endDate).toLocaleDateString("de-DE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
        <ProgressBar value={progress} />
      </div>

      {/* Process Pipeline */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8 md:p-10 mb-10">
        <p className="text-xl font-semibold text-gray-900 mb-10">Projektablauf</p>
        <div className="flex items-start">
          {PROCESS_STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isCurrent = i === currentStep;
            return (
              <div key={step} className="flex items-start flex-1 last:flex-none">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      isDone
                        ? "bg-gray-900 text-white"
                        : isCurrent
                        ? "bg-gray-900 text-white ring-4 ring-gray-900/10"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-5 h-5" strokeWidth={2.5} />
                    ) : isCurrent ? (
                      <Zap className="w-5 h-5" />
                    ) : (
                      <span className="text-base">{i + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-sm mt-4 font-medium ${
                      isDone || isCurrent ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-4 mt-6 ${
                      isDone ? "bg-gray-900" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8 md:p-10 mb-10">
        <p className="text-xl font-semibold text-gray-900 mb-10">Meilensteine</p>
        {milestones.length > 0 ? (
          <ProjectTimeline milestones={milestones} />
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">
              Meilensteine werden nach der Projektplanung angelegt.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/portal/nachrichten"
          className="flex items-center gap-3 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow"
        >
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Nachricht senden</span>
        </Link>
        <Link
          href="/portal/support"
          className="flex items-center gap-3 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow"
        >
          <LifeBuoy className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Support-Ticket</span>
        </Link>
        <Link
          href="/portal/dokumente"
          className="flex items-center gap-3 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow"
        >
          <FileText className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Dokumente</span>
        </Link>
      </div>
    </>
  );
}
