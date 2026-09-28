import { competitions, education, featured, inProgress, others, profile, stack } from "@/content";
import { CompactProject } from "@/components/CompactProject";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import type { TocItem } from "@/components/TableOfContents";

const sections = {
  featured: { id: "destacados", number: 2, title: "Proyectos destacados" },
  others: { id: "otros", number: 3, title: "Otros proyectos" },
  inProgress: { id: "en-curso", number: 4, title: "En curso" },
  competitions: { id: "competencias", number: 5, title: "Competencias" },
  stack: { id: "stack", number: 6, title: "Stack" },
  education: { id: "formacion", number: 7, title: "Formación" },
  contact: { id: "contacto", number: 8, title: "Contacto" },
} satisfies Record<string, TocItem>;

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Hero toc={Object.values(sections)} />

      <main id="contenido" tabIndex={-1}>
        <Section {...sections.featured} band="paper">
          <div className="featured-list">
            {featured.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))}
          </div>
        </Section>

        <Section {...sections.others} band="sand">
          <p className="swipe-hint label" aria-hidden="true">
            Deslizá →
          </p>
          {/* En mobile es un carrusel con scroll-snap; desde 640px, grilla de 2. */}
          <div className="carousel" role="region" aria-label="Otros proyectos" tabIndex={0}>
            <ul>
              {others.map((project) => (
                <li key={project.id}>
                  <CompactProject project={project} />
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section {...sections.inProgress} band="sand">
          <CompactProject project={inProgress} dashed />
        </Section>

        <Section {...sections.competitions} band="sage">
          <ul className="bento">
            {competitions.map((c) => (
              <li key={c.title} className={c.highlights ? "card bento-wide" : "card"}>
                <p className="bento-title">
                  {c.title}
                  <span className="bento-year">{c.year}</span>
                </p>
                {c.highlights && (
                  <dl className="highlights">
                    {c.highlights.map((h) => (
                      <div key={h.label}>
                        <dt className="label">{h.label}</dt>
                        <dd>{h.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="bento-text">{c.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section {...sections.stack} band="paper">
          <dl className="stack-grid">
            {stack.map((group) => (
              <div key={group.level} className="card">
                <dt className="label">{group.level}</dt>
                <dd>
                  <ul className="tags neutral">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section {...sections.education} band="sand">
          <ol className="timeline">
            {education.map((item) => (
              <li key={item.title}>
                <p className="timeline-period">{item.period}</p>
                <div className="timeline-body">
                  <p className="timeline-title">{item.title}</p>
                  <p className="timeline-place">{item.place}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section {...sections.contact} band="ink">
          <dl className="contact">
            <div>
              <dt className="label">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt className="label">GitHub</dt>
              <dd>
                <a href={profile.github}>{profile.github.replace("https://", "")}</a>
              </dd>
            </div>
            <div>
              <dt className="label">LinkedIn</dt>
              <dd>
                <a href={profile.linkedin}>
                  {decodeURI(profile.linkedin).replace("https://www.", "")}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">CV</dt>
              <dd>
                <a href={profile.cv} className="button">
                  Descargar CV <span className="button-meta">PDF</span>
                </a>
              </dd>
            </div>
          </dl>
        </Section>
      </main>
    </>
  );
}
