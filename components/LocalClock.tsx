"use client";

import { useSyncExternalStore } from "react";

// Única isla con JS de la página. En el servidor no renderiza nada:
// sin JS se ve solo la ciudad, y el resto del contenido no depende de esto.
const format = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Cordoba", // zona horaria que usa Corrientes
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}
const getSnapshot = () => format.format(new Date());
const getServerSnapshot = () => null;

export function LocalClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!time) return null;
  return (
    <>
      {" "}
      <span aria-hidden="true">·</span> <time>{time}</time> UTC−3
    </>
  );
}
