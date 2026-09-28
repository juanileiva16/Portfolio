# Contenido del portfolio — Juan Ignacio Rodríguez Leiva

> Este archivo es la fuente de contenido del portfolio. Claude Code lo lee para
> poblar `content.ts`. Los campos de cada proyecto son siempre los mismos:
> Contexto, Mi rol, El problema, Qué construimos, Decisiones técnicas, Estado, Links.

---

## Datos generales

- **Nombre:** Juan Ignacio Rodríguez Leiva (Juani)
- **Ubicación:** Corrientes, Argentina
- **Situación:** Estudiante de 4º año de Ingeniería en Sistemas de Información, UTN Facultad Regional Resistencia
- **Email:** juanignaciorodriguezleiva5@gmail.com
- **GitHub:** https://github.com/juanileiva16
- **LinkedIn:** https://www.linkedin.com/in/juan-ignacio-rodríguez-leiva-75009b38b

### Frase de identidad

"Estudiante de Ingeniería en Sistemas en UTN FRRe. Incursiono en la construcción de aplicaciones web y me interesa lo que pasa debajo: seguridad, interpretabilidad de modelos y cómo el código llega a producción." 

---

## Proyectos destacados

### 1. NLASmith — Framework para la experimentación con Natural Language Autoencoders

- **Contexto:** Trabajo de investigación en colaboración con Alejo Rojas. UTN FRRe, 2026. Dio origen a un paper presentado al congreso de ingeniería en sistemas, actualmente en evaluación.
- **Mi rol:** Coautor del paper. Escribí el modelo conceptual sobre el que se apoya la herramienta y la descripción de su funcionamiento. Del lado del desarrollo implementé la configuración de los evaluadores, que es la pieza que permite definir la rúbrica, el modelo juez y el esquema de salida de cada experimento.
- **El problema:** Los Natural Language Autoencoders traducen activaciones internas de un modelo de lenguaje a descripciones en lenguaje natural. El problema no es generarlas, sino analizarlas: la inspección es manual, caso por caso, y no queda registro reproducible de con qué configuración se obtuvo cada resultado. Un experimento con 100 prompts, 3 posiciones de token, 2 criterios de evaluación y 2 configuraciones multiplica las observaciones hasta volver impracticable el análisis a mano.
- **Qué construimos:** Un framework web que integra el experimento completo en un solo flujo: dataset de prompts, configuración de ejecución, política de selección de tokens, obtención de las verbalizaciones, evaluación con criterios configurables y agregación de métricas. Cada corrida queda guardada como unidad reproducible, con su configuración, sus resultados intermedios y sus métricas.
- **Decisiones técnicas:**
  - Separación entre obtener la verbalización y evaluarla. El evaluador es un instrumento de medición configurable, no una fuente de verdad, así que la rúbrica, el modelo juez y el esquema de salida se persisten junto con la corrida para que el resultado pueda auditarse y reproducirse.
  - LLM-as-a-judge con rúbrica en lenguaje natural definida por el investigador y salida booleana, numérica o categórica. Permite cambiar la pregunta de investigación sin tocar la lógica del framework.
  - La integración con Neuronpedia se encapsula en un módulo que normaliza las respuestas a un esquema interno, de modo que el resto de los componentes no dependan de la forma de esa API.
  - El modelo conceptual toma como referencia las plataformas de evaluación de aplicaciones LLM (LangSmith, Langfuse) y lo adapta a un dominio donde la unidad de análisis es una posición de token.
- **Estado:** Prototipo funcional desplegado. Paper enviado al congreso, en evaluación.
- **Links:** https://github.com/alejorrojas/nlasmith · https://nlasmith.com

---

### 2. Mantia CMMS — Sistema de gestión de mantenimiento de equipos

- **Contexto:** Seminario Integrador, UTN FRRe, 2026. Equipo de 5 personas.
- **Mi rol:** Implementé las pantallas de alta y edición de equipos, fallas, tareas generales y repuestos, con su validación y su integración contra la capa de datos, y resolví los errores detectados sobre esas pantallas. También participé del testeo manual de la aplicación.
- **El problema:** El mantenimiento de equipos en planta se gestiona con planillas y avisos informales. No hay trazabilidad de quién reportó una falla, quién la tomó, cuánto tardó en resolverse ni cuántos repuestos se consumieron en el proceso.
- **Qué construimos:** Una aplicación mobile-first con tres roles (usuario, técnico, administrador). Cubre el ciclo completo de una falla (reportar con foto desde el celular en planta, asignar, iniciar, resolver), con historial por equipo, cola de trabajo para técnicos, inventario de repuestos, ingreso de stock por compras y pedidos de compra con circuito de aprobación.
- **Decisiones técnicas:**
  - Expo SDK 54 con React Native y Expo Router: una sola base de código para iOS, Android y web. Se sostuvo SDK 54 y no 57 porque Expo Go para 57 todavía no estaba disponible para todos los dispositivos y bloqueaba probar en celulares reales.
  - Los permisos viven en la base, no en la interfaz. El rol se lee de `profiles.role`, nunca de claims del JWT, y las políticas RLS de Postgres los refuerzan: un usuario que le pegue directo a Supabase salteando la app recibe error de permisos igual.
  - Las operaciones que tocan stock pasan solo por RPC transaccionales (`registrar_compra`, `resolver_pedido_compra`). El ABM nunca escribe la cantidad a mano, así que el inventario no puede quedar inconsistente.
  - Ninguna pantalla llama a Supabase directamente: todo el acceso pasa por una capa de queries, lo que permite testear la lógica de datos mockeando el cliente en vez de pegarle a la base real.
  - Las fotos de falla se comprimen a webp en el dispositivo y se suben en base64 en lugar de usar `blob:` + `fetch`, porque Safari en iOS devuelve blobs de 0 bytes de forma silenciosa con ese patrón.
- **Estado:** En desarrollo activo. El mantenimiento preventivo está modelado en el schema pero todavía sin interfaz.
- **Links:** https://github.com/Tini-Pare/SeminarioIntegrador

---

### 3. Módulo de logística — Backend de tracking de pedidos

- **Contexto:** Trabajo Práctico Integrador de Desarrollo de Software, UTN FRRe, 2025. Grupo 3 (Big Brain). El sistema se construye entre varios grupos bajo una arquitectura de microservicios, así que el backend tiene que ser consumible por equipos externos.
- **Mi rol:** Diseñé e implementé los endpoints REST de tracking de pedidos y gestión de bultos, definiendo la lógica de negocio del módulo y asegurando su integración con el frontend.
- **El problema:** El módulo de logística tiene que exponer el seguimiento de envíos y la gestión de bultos a otros servicios del sistema, con contratos estables y un servicio que cualquier grupo pueda levantar sin pedir ayuda.
- **Qué construimos:** Un backend de logística en NestJS sobre MySQL, autenticado contra Keycloak e integrado con el servicio de stock a través del API gateway. Se empaqueta en una imagen Docker publicada en GitHub Container Registry, con un `docker-compose` documentado para que otros equipos levanten el servicio y su base en un comando.
- **Decisiones técnicas:** NestJS y TypeScript, TypeORM sobre MySQL 8, Keycloak como servidor de autenticación, healthcheck de la base en el compose para que el backend no arranque antes de tiempo, imagen publicada en GHCR para distribución entre grupos.
- **Estado:** Entregado.
- **Links:** https://github.com/FRRe-DS/2025-03-TPI

---

## Otros proyectos

### 4. Pipeline de CI/CD — Predicción Mundial 2026

- **Contexto:** Ingeniería y Calidad de Software, UTN FRRe, 2026.
- **Mi rol:** Construí la API en Express, definí el pipeline de integración y entrega continua y apliqué Spec Driven Development con Gherkin y `jest-cucumber`. También armé la imagen Docker y su publicación en GHCR.
- **El problema:** Un entorno de CI/CD necesita una aplicación sobre la cual ejercitarse. La app, que predice el ganador del Mundial 2026, es deliberadamente simple: el objetivo del proyecto no es la app sino el pipeline que se construye a su alrededor.
- **Qué construimos:** Una API en Express con pipeline completo: build, análisis estático con ESLint, pruebas unitarias y de integración con Jest y Supertest, construcción de la imagen Docker en cada pull request, publicación en GHCR al fusionar a `main` y notificación a Discord.
- **Decisiones técnicas:** Spec Driven Development. Los criterios de aceptación están escritos en Gherkin y se ejecutan con `jest-cucumber`: la especificación *es* el test. Si alguien cambia la lógica y viola un criterio, la spec falla, el job de CI se pone en rojo y el merge queda bloqueado. Así la documentación funcional y el código no pueden desincronizarse. La app Express se exporta sin abrir el puerto, lo que permite levantarla dentro de los tests con Supertest.
- **Estado:** Terminado. Imagen publicada en `ghcr.io/juanileiva16/mundial-2026-prediccion`.
- **Links:** https://github.com/juanileiva16/ICS-proyecto-CI-CD

---

### 5. Simplex — Asistente de programación lineal

- **Contexto:** Investigación Operativa, UTN FRRe, 2026. Grupo Los Opti-místicos, 6 integrantes, metodología Scrum con 10 sprints.
- **Mi rol:** Product Owner: definición y priorización del backlog y de los criterios de aceptación a lo largo de los sprints. Del lado del código, resolví los errores en la persistencia de los chats en el historial.
- **El problema:** Un estudiante que aprende el método Simplex necesita ver cada iteración, no solo el resultado. Y un modelo de lenguaje resolviendo el problema por su cuenta produce números poco confiables.
- **Qué construimos:** Un asistente web que resuelve problemas de programación lineal y explica cada iteración como lo haría un profesor: variable entrante, variable saliente, pivote y operaciones elementales, con las tablas renderizadas en notación matemática.
- **Decisiones técnicas:** El problema lo resuelve un solver determinista Big-M implementado en TypeScript, no el modelo. El LLM recibe los tableaux ya calculados y solo se encarga de explicarlos, de manera que los números son exactos y el rol del modelo queda acotado a lo que hace bien. Las limitaciones del solver están documentadas de forma explícita: requiere variables no negativas, no maneja variables libres ni RHS negativo y no implementa la regla de Bland contra ciclado. Stack: Next.js, Vercel AI SDK, Supabase con RLS para persistir los chats por usuario y KaTeX para el render matemático.
- **Estado:** Desplegado.
- **Links:** https://chatbot-io-omega.vercel.app · https://github.com/alejorrojas/chatbot-io

---

## En curso

### 6. Sistema de pedidos de viandas

- **Contexto:** Proyecto personal, 2026.
- **Mi rol:** Desarrollo completo.
- **El problema:** La entrega diaria de viandas al personal de un banco se gestiona con una lista en papel. No hay forma rápida de saber qué menú eligió cada persona, quién ya retiró y cuántos pedidos quedan pendientes.
- **Qué construimos:** Una pantalla con los pedidos del día, el menú elegido por cada persona, marcado de entrega y contador de pendientes. La primera versión trabaja con datos cargados manualmente; la carga desde Excel, CSV o imagen queda para una segunda etapa.
- **Estado:** Fase inicial.
- **Links:** (sin link por ahora)

---

## Competencias

- **Torneo Argentino de Programación, 2026** — Competencia estilo ICPC, en Python. Cuarto puesto en la sede Resistencia y puesto 70 a nivel nacional entre 186 equipos.
- **picoCTF, 2026** — Competencia internacional de capture the flag. Kali Linux y herramientas de análisis.
- **HackLab Argentina (UTN), 2025** — Competencia de ciberseguridad: detección de vulnerabilidades, análisis de tráfico de red y resolución de desafíos técnicos.

---

## Stack

- **Uso a diario:** TypeScript, JavaScript, React, Next.js, Node.js, SQL (PostgreSQL y MySQL), Git y GitHub.
- **Trabajé con:** React Native y Expo, NestJS, Supabase, Docker, Jest, Python, TypeORM, Burp Suite, Bruno.
- **Aprendiendo:** Django, pentesting web, Kali Linux.

---

## Formación

- Universidad Tecnológica Nacional, Facultad Regional Resistencia — Ingeniería en Sistemas de Información (2023–2028).
- Pentesting Web nivel 1 — Software Seguro, 2026.
- Desarrollo Web — Aprender Programando, GCBA, 2022.
- Alemán nivel A2 — Centro de Idiomas Teplitzky's, 2021–2023.
