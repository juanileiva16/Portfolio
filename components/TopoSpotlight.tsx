"use client";

import { useEffect, useRef } from "react";

// "Linterna" sobre las curvas de nivel: una capa verde, recortada con el mismo
// SVG del fondo, que solo se ve en un círculo alrededor del cursor.
// Las coordenadas se escriben en el estilo de esta capa (no en <html>) para
// que el navegador recalcule un solo elemento por cuadro, no toda la página.
export function TopoSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    // Solo con mouse: en pantallas táctiles no hay cursor que seguir.
    if (!layer || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      layer.style.setProperty("--mx", `${x}px`);
      layer.style.setProperty("--my", `${y}px`);
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      layer.dataset.active = "true";
      // Como mucho una actualización por cuadro de pantalla.
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      delete layer.dataset.active;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="topo-spotlight" aria-hidden="true" />;
}
