import type { Project } from "@/content";
import { ProjectDetails, SummaryFields } from "./ProjectFields";
import { ProjectLinks } from "./ProjectLinks";
import { Tags } from "./Tags";

export function CompactProject({ project, dashed = false }: { project: Project; dashed?: boolean }) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={dashed ? "card compact dashed" : "card compact"}
    >
      <h3 id={`${project.id}-title`} className="project-title">
        {project.title}
        {project.subtitle && <span className="project-subtitle">{project.subtitle}</span>}
      </h3>
      <Tags tags={project.tags} />
      <SummaryFields project={project} />
      <ProjectDetails project={project} />
      <ProjectLinks project={project} />
    </article>
  );
}
