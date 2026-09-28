import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content";

// Se genera una sola vez en build (ruta estática) con la misma paleta y fuentes del sitio.
export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GREEN = "#5BE49B";
// Esquina del marco: solo los dos bordes que corresponden a su posición.
const corner = (pos: Partial<Record<"top" | "bottom" | "left" | "right", number>>) => {
  const border = `3px solid ${GREEN}`;
  const sides = Object.fromEntries(
    Object.keys(pos).map((side) => [`border${side[0].toUpperCase()}${side.slice(1)}`, border]),
  );
  return { position: "absolute" as const, width: 36, height: 36, ...pos, ...sides };
};

export default async function OpengraphImage() {
  const fonts = join(process.cwd(), "assets/fonts");
  const [display, mono, sans] = await Promise.all([
    readFile(join(fonts, "ChakraPetch-SemiBold.woff")),
    readFile(join(fonts, "IBMPlexMono-Medium.woff")),
    readFile(join(fonts, "IBMPlexSans-Regular.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 48,
          background: "#0A0F0C",
          color: "#D7E3DA",
          fontFamily: "IBM Plex Sans",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 56px",
            border: "1px solid #1E2A23",
            background: "#0F1612",
          }}
        >
          <div style={corner({ top: -2, left: -2 })} />
          <div style={corner({ top: -2, right: -2 })} />
          <div style={corner({ bottom: -2, left: -2 })} />
          <div style={corner({ bottom: -2, right: -2 })} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "IBM Plex Mono",
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#8A9A8F",
            }}
          >
            <span>{profile.occupation}</span>
            <span style={{ display: "flex", alignItems: "center", color: GREEN }}>
              <span
                style={{ width: 12, height: 12, borderRadius: 6, background: GREEN, marginRight: 14 }}
              />
              {profile.availability}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Chakra Petch",
                fontSize: 80,
                lineHeight: 1,
                textTransform: "uppercase",
                color: "#D7E3DA",
              }}
            >
              {profile.name}
            </div>
            <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.45, color: "#8A9A8F", maxWidth: 960 }}>
              {profile.tagline}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Chakra Petch", data: display, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 500, style: "normal" },
        { name: "IBM Plex Sans", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
