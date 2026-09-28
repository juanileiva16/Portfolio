import { profile } from "@/content";
import { TableOfContents, type TocItem } from "./TableOfContents";

export function Hero({ toc }: { toc: TocItem[] }) {
  return (
    <header className="band band-ink hero">
      <div className="container">
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-nickname">{profile.nickname}</p>
        <p className="hero-tagline">{profile.tagline}</p>
        <p className="hero-location label">{profile.location}</p>
        <ul className="hero-links" aria-label="Enlaces">
          <li>
            <a href={profile.github}>GitHub</a>
          </li>
          <li>
            <a href={profile.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
          <li>
            <a href={profile.cv} className="button">
              CV <span className="button-meta">PDF</span>
            </a>
          </li>
        </ul>
        <TableOfContents items={toc} />
      </div>
    </header>
  );
}
