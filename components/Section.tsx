import type { ReactNode } from "react";

export type Band = "ink" | "paper" | "sand" | "sage";
type Props = { id: string; number: number; title: string; band: Band; children: ReactNode };

// Cada sección es una banda de color a todo el ancho con el contenido centrado.
export function Section({ id, number, title, band, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`band band-${band}`}>
      <div className="container">
        <div className="section-head">
          <p className="section-number" aria-hidden="true">
            §{number}
          </p>
          <h2 id={`${id}-title`} className="section-title">
            <span className="mark">{title}</span>
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
