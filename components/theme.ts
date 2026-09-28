// Constantes del tema compartidas entre el servidor (layout) y el botón (cliente).
export type Theme = "light" | "dark";
export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "themechange";

// Se ejecuta en el <head> antes de pintar: aplica el tema guardado y así la
// página no parpadea con el tema equivocado al cargar.
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
