import type { Project } from "@/content";

export function ProjectLinks({ project }: { project: Project }) {
  if (project.links.length === 0) return null;
  return (
    <ul className="project-links">
      {project.links.map((link) => (
        <li key={link.href}>
          <a href={link.href}>
            {link.label}
            <span className="sr-only"> de {project.title}</span>
            <span aria-hidden="true" className="arrow">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
