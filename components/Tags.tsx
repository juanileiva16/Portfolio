export function Tags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <ul className="tags" aria-label="Tecnologías">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
