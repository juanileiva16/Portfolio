import type { Project } from "@/content";
import { ProjectDetails, SummaryFields } from "./ProjectFields";
import { ProjectLinks } from "./ProjectLinks";
import { pad } from "./TableOfContents";
import { Tags } from "./Tags";

export function CompactProject({ project, index }: { project: Project; index: number }) {
  return (
    <article id={project.id} aria-labelledby={`${project.id}-title`} className="panel project compact">
      <p className="project-index label" aria-hidden="true">
        P-{pad(index)}
      </p>
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
