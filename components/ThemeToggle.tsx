"use client";

import { useSyncExternalStore } from "react";

import { THEME_CHANGE_EVENT, THEME_STORAGE_KEY, type Theme } from "./theme";

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

// Tema efectivo: el elegido a mano si existe; si no, el del sistema.
function getTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return darkQuery().matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const query = darkQuery();
  query.addEventListener("change", onChange);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => {
    query.removeEventListener("change", onChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);
  // En el servidor (y sin JS) no se renderiza: un botón que no funciona confunde.
  if (!theme) return null;

  const isDark = theme === "dark";

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento (modo privado estricto): el cambio dura hasta recargar.
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  // role="switch" + aria-checked: el lector de pantalla anuncia
  // "Modo oscuro, interruptor, activado/desactivado".
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Modo oscuro"
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="theme-switch"
      onClick={toggle}
    >
      <span className="theme-switch-track" aria-hidden="true">
        <SunIcon />
        <MoonIcon />
        <span className="theme-switch-thumb" />
      </span>
    </button>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
