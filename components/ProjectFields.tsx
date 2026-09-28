import type { Project } from "@/content";
import { Rich } from "./Rich";

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        <Rich text={text} />
      </dd>
    </div>
  );
}

// Primera capa: lo que se lee sin abrir nada.
export function SummaryFields({ project }: { project: Project }) {
  return (
    <dl className="fields">
      <Field label="Contexto" text={project.context} />
      <Field label="Mi rol" text={project.role} />
      <Field label="Estado" text={project.status} />
    </dl>
  );
}

// Segunda capa: <details> nativo. Funciona sin JS y el texto igual está en el HTML.
export function ProjectDetails({ project, open = false }: { project: Project; open?: boolean }) {
  const { decisions } = project;
  return (
    <details className="more" open={open}>
      <summary>{decisions ? "Problema, solución y decisiones técnicas" : "Problema y solución"}</summary>
      <dl className="fields">
        <Field label="El problema" text={project.problem} />
        <Field label="Qué construimos" text={project.built} />
        {decisions && (
          <div>
            <dt>Decisiones técnicas</dt>
            <dd>
              {Array.isArray(decisions) ? (
                <ul className="decisions">
                  {decisions.map((d) => (
                    <li key={d}>
                      <Rich text={d} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Rich text={decisions} />
              )}
            </dd>
          </div>
        )}
      </dl>
    </details>
  );
}
