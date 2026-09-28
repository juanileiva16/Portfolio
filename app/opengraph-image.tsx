import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content";

// Se genera una sola vez en build (ruta estática) con las mismas fuentes y paleta del sitio.
export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fonts = join(process.cwd(), "assets/fonts");
  const [serif, serifSemibold, sansSemibold] = await Promise.all([
    readFile(join(fonts, "SourceSerif4-Regular.ttf")),
    readFile(join(fonts, "SourceSerif4-Semibold.ttf")),
    readFile(join(fonts, "SourceSans3-Semibold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#1C1B19",
          color: "#F3EEE5",
          fontFamily: "Source Serif 4",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Source Sans 3",
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#F0A07A",
          }}
        >
          Portfolio · {profile.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -1 }}>
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 32,
              paddingLeft: 28,
              borderLeft: "4px solid #F0A07A",
              fontSize: 30,
              lineHeight: 1.4,
              color: "#B5AEA2",
              maxWidth: 960,
            }}
          >
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Source Serif 4", data: serif, weight: 400, style: "normal" },
        { name: "Source Serif 4", data: serifSemibold, weight: 600, style: "normal" },
        { name: "Source Sans 3", data: sansSemibold, weight: 600, style: "normal" },
      ],
    },
  );
}
