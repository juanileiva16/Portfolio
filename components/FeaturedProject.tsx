import type { Project } from "@/content";
import { ProjectDetails, SummaryFields } from "./ProjectFields";
import { ProjectLinks } from "./ProjectLinks";
import { Tags } from "./Tags";

export function FeaturedProject({ project }: { project: Project }) {
  const { research, tone } = project;
  const classes = ["card", "featured", tone && `tone-${tone}`, research && "research"];
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={classes.filter(Boolean).join(" ")}
    >
      <div className="card-meta">
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
