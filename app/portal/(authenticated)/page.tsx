import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/portal/session";
import { getProjectsForCustomer, getCustomerById, getMilestonesForProject, calculateProgress } from "@/lib/portal/notion";
import { getMessagesForCustomer } from "@/lib/portal/notion";
import { ProgressBar } from "@/components/portal/ProgressBar";
import { EmptyState } from "@/components/portal/EmptyState";
import {
  FolderKanban,
  ArrowRight,
  MessageSquare,
  Coffee,
  Sun,
  Moon,
} from "lucide-react";

const CARD_IMAGES = [
  "/portal-jellyfish.jpg",
  "/portal-paint.jpg",
  "/portal-blue.jpg",
  "/portal-bubbles.jpg",
];

function getGreeting(): { text: string; icon: typeof Sun } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Guten Morgen", icon: Coffee };
  if (hour < 18) return { text: "Guten Tag", icon: Sun };
  return { text: "Guten Abend", icon: Moon };
}

function getStatusMessage(activeCount: number, progress: number): string {
  if (activeCount === 0) return "Aktuell keine laufenden Projekte — genießen Sie die Ruhe.";
  if (progress >= 80) return "Fast geschafft — Ihr Projekt ist auf der Zielgeraden.";
  if (progress >= 50) return "Läuft super — wir sind gut im Zeitplan.";
  if (progress > 0) return "Es geht voran — wir halten Sie auf dem Laufenden.";
  return "Ihr Projekt ist in der Startphase — es geht bald richtig los.";
}

export default async function DashboardPage() {
  const session = await getSession();

  const customer = await getCustomerById(session.customerId);
  if (customer && !customer.avvSigned) {
    redirect("/portal/onboarding");
  }

  const [projects, messages] = await Promise.all([
    getProjectsForCustomer(session.customerId),
    getMessagesForCustomer(session.customerId),
  ]);

  const activeProjects = projects.filter((p) => p.status !== "Abgeschlossen");
  const unreadMessages = messages.filter((m) => !m.read);

  // Calculate progress from milestones
  const projectsWithProgress = await Promise.all(
    activeProjects.slice(0, 4).map(async (project) => {
      const milestones = await getMilestonesForProject(project.id);
      return { ...project, progress: calculateProgress(milestones) };
    })
  );

  const avgProgress = projectsWithProgress.length > 0
    ? Math.round(projectsWithProgress.reduce((s, p) => s + p.progress, 0) / projectsWithProgress.length)
    : 0;

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <>
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-12" style={{ minHeight: "280px" }}>
        <Image
          src="/portal-jellyfish.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1100px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-gray-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
        <div className="relative z-10 p-10 md:p-12 flex flex-col justify-end h-full" style={{ minHeight: "280px" }}>
          <div className="flex items-center gap-2 text-white/40 mb-3">
            <GreetingIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{greeting.text}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            {customer?.contactPerson || session.name}
          </h1>
          <p className="text-sm text-white/50 max-w-md">
            {getStatusMessage(activeProjects.length, avgProgress)}
          </p>

          {/* Inline progress */}
          {activeProjects.length > 0 && (
            <div className="mt-6 flex items-center gap-4 max-w-sm">
              <div className="flex-1">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: `${avgProgress}%` }} />
                </div>
              </div>
              <span className="text-sm font-bold text-white tabular-nums">{avgProgress}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Projects as image cards */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            Ihre Projekte
          </h2>
          {projects.length > 0 && (
            <Link
              href="/portal/projekte"
              className="text-sm text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              Alle ansehen
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {projectsWithProgress.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="Noch keine aktiven Projekte"
            description="Sobald wir loslegen, sehen Sie hier den aktuellen Stand."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projectsWithProgress.map((project, i) => (
              <Link
                key={project.id}
                href={`/portal/projekte/${project.id}`}
                className="group relative rounded-2xl overflow-hidden"
                style={{ minHeight: "240px" }}
              >
                <Image
                  src={CARD_IMAGES[i % CARD_IMAGES.length]}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/40" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-7" style={{ minHeight: "240px" }}>
                  <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-2">
                    {project.status}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">{project.progress}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Messages hint */}
      {unreadMessages.length > 0 && (
        <Link
          href="/portal/nachrichten"
          className="flex items-center gap-4 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-gray-900">
              {unreadMessages.length === 1
                ? "Sie haben eine neue Nachricht"
                : `Sie haben ${unreadMessages.length} neue Nachrichten`}
            </p>
            <p className="text-sm text-gray-400 mt-0.5">{unreadMessages[0].subject}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
        </Link>
      )}

      <div className="mt-20 text-center">
        <p className="text-xs text-gray-400">
          Fragen?{" "}
          <Link href="/portal/nachrichten" className="text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-2">Nachricht senden</Link>{" "}
          oder{" "}
          <Link href="/portal/support" className="text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-2">Support-Ticket erstellen</Link>
        </p>
      </div>
    </>
  );
}
