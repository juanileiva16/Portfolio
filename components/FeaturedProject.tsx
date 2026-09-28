import type { Project } from "@/content";
import { ProjectDetails, SummaryFields } from "./ProjectFields";
import { ProjectLinks } from "./ProjectLinks";
import { pad } from "./TableOfContents";
import { Tags } from "./Tags";

export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const { research } = project;
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={research ? "panel project featured research" : "panel project featured"}
    >
      <div className="card-meta">
        <p className="project-index label" aria-hidden="true">
          P-{pad(index)}
        </p>
        {research && (
          <p className="kicker label">
            Investigación <span aria-hidden="true">·</span> {research.label}
          </p>
        )}
        <h3 id={`${project.id}-title`} className="project-title">
          {project.title}
          {project.subtitle && <span className="project-subtitle">{project.subtitle}</span>}
        </h3>
        {research && (
          <p className="research-byline">
            {research.authors} <span aria-hidden="true">—</span> {research.venue}
          </p>
        )}
        <Tags tags={project.tags} />
        <ProjectLinks project={project} />
      </div>
      <div className="card-body">
        <SummaryFields project={project} />
        <ProjectDetails project={project} open={Boolean(research)} />
      </div>
    </article>
  );
}
