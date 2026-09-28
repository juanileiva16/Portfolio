import { Fragment } from "react";

// Interpreta dos marcas mínimas del texto de content.ts sin alterarlo:
// `código` → <code> y *énfasis* → <em>.
const TOKEN = /(`[^`]+`|\*[^*\s][^*]*\*)/g;

export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
