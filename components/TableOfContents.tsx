export type TocItem = { id: string; number: number; title: string };

export const pad = (n: number) => String(n).padStart(2, "0");

export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="Índice" className="toc">
      <h2 className="label">Índice</h2>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <span className="toc-number" aria-hidden="true">
                {pad(item.number)}
              </span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
