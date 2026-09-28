import type { ReactNode } from "react";
import { pad } from "./TableOfContents";

type Props = { id: string; number: number; title: string; children: ReactNode };

export function Section({ id, number, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-number" aria-hidden="true">
            {pad(number)}
          </span>
          <h2 id={`${id}-title`} className="section-title">
            <span className="mark">{title}</span>
          </h2>
          <span className="section-rule" aria-hidden="true" />
        </div>
        {children}
      </div>
    </section>
  );
}
