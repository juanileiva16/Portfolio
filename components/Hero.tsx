import { inProgress, profile } from "@/content";
import { LocalClock } from "./LocalClock";
import { TableOfContents, type TocItem } from "./TableOfContents";
import { ThemeToggle } from "./ThemeToggle";

export function Hero({ toc }: { toc: TocItem[] }) {
  return (
    <header className="hero">
      <div className="container topbar">
        <p className="label">J. I. Rodríguez Leiva</p>
        <div className="topbar-end">
          <p className="label">
            Corrientes
            <LocalClock />
          </p>
          <ThemeToggle />
        </div>
      </div>

      <div className="container hero-grid">
        <div className="hero-main">
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-nickname">{profile.nickname}</p>
          <p className="hero-tagline">{profile.tagline}</p>
          <TableOfContents items={toc} />
        </div>

        <aside className="hero-side" aria-label="Perfil">
          <div className="panel profile">
            <dl className="profile-fields">
              <div>
                <dt className="label">Ocupación</dt>
                <dd>{profile.occupation}</dd>
              </div>
              <div>
                <dt className="label">Ubicación</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt className="label">Disponibilidad</dt>
                <dd className="availability">
                  <span className="status-dot" aria-hidden="true" />
                  {profile.availability}
                </dd>
              </div>
            </dl>
            <ul className="profile-links" aria-label="Enlaces">
              <li>
                <a href={profile.github}>GitHub</a>
              </li>
              <li>
                <a href={profile.linkedin}>LinkedIn</a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
            </ul>
            <a href={profile.cv} className="button">
              Descargar CV <span className="button-meta">PDF</span>
            </a>
          </div>

          <a href="#en-curso" className="panel mission-teaser">
            <span className="mission-bar label">Misión activa</span>
            <span className="mission-body">
              <span className="mission-name">{inProgress.title}</span>
              <span className="label">{inProgress.status}</span>
            </span>
          </a>
        </aside>
      </div>
    </header>
  );
}
