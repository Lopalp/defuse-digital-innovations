import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/portal/session";
import { getProjectsForCustomer, getMilestonesForProject, calculateProgress } from "@/lib/portal/notion";
import { ProgressBar } from "@/components/portal/ProgressBar";
import { EmptyState } from "@/components/portal/EmptyState";
import { FolderKanban } from "lucide-react";

const CARD_IMAGES = [
  "/portal-jellyfish.jpg",
  "/portal-paint.jpg",
  "/portal-blue.jpg",
  "/portal-bubbles.jpg",
];

export default async function ProjektePage() {
  const session = await getSession();
  const projects = await getProjectsForCustomer(session.customerId);

  // Calculate progress for each project from milestones
  const projectsWithProgress = await Promise.all(
    projects.map(async (project) => {
      const milestones = await getMilestonesForProject(project.id);
      return { ...project, progress: calculateProgress(milestones) };
    })
  );

  return (
    <>
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Ihre Projekte
        </h1>
        <p className="text-base text-gray-400 mt-2">
          {projects.length === 1
            ? "1 aktives Projekt"
            : `${projects.length} Projekte im Überblick`}
        </p>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="Noch keine Projekte"
          description="Sobald ein Projekt angelegt wird, erscheint es hier."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projectsWithProgress.map((project, i) => (
            <Link
              key={project.id}
              href={`/portal/projekte/${project.id}`}
              className="group relative rounded-2xl overflow-hidden"
              style={{ minHeight: "320px" }}
            >
              {/* Background image */}
              <Image
                src={CARD_IMAGES[i % CARD_IMAGES.length]}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/40" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-7 md:p-8">
                {/* Top — status + type */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
                    {project.type}
                  </span>
                  <span className="text-[11px] font-medium text-white/50 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    {project.status}
                  </span>
                </div>

                {/* Bottom — name, description, progress */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-2">
                    {project.name}
                  </h2>
                  {project.description && (
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-5">
                      {project.description}
                    </p>
                  )}

                  {/* Progress bar + info */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-white tabular-nums">
                      {project.progress}%
                    </span>
                  </div>
                  {project.endDate && (
                    <p className="text-xs text-white/30 mt-3">
                      Deadline: {new Date(project.endDate).toLocaleDateString("de-DE", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
