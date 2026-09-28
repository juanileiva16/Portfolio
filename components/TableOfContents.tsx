export type TocItem = { id: string; number: number; title: string };

export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="Índice" className="toc">
      <h2 className="label">Índice</h2>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <span className="toc-number" aria-hidden="true">
                §{item.number}
              </span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
