// * ─────────────────────────────────────────────────────────────────────────────
// * NOTE — notas de texto libre
// * ─────────────────────────────────────────────────────────────────────────────

import type { BaseEntity, ColorTag, Status } from "./common";

/*
 * Una nota individual.
 * El contenido es texto plano por ahora, pero 'content_type' te permite
 * escalar a markdown o rich-text en el futuro sin cambiar la estructura.
 */
export interface Note extends BaseEntity {
  title: string;
  content: string;
  content_type: "plain" | "markdown"; // * listo para Monaco + markdown rendering
  status: Status;
  color: ColorTag;
  pinned: boolean; // * las notas fijadas aparecen primero en la lista
  folder_id: string | null; // * null = raíz, sin carpeta
  tags: string[]; // * ej: ['trabajo', 'ideas', 'javascript']
}

/*
 * Carpeta para organizar notas.
 * No anidamos carpetas por ahora (parent_id comentado),
 * pero la clave ya está lista para cuando la necesites.
 */
export interface NoteFolder extends BaseEntity {
  name: string;
  color: ColorTag;
  // ? parent_id: string | null  // descomentar para carpetas anidadas (fase futura)
}

// * Lo que necesitas para crear una nota (sin campos que genera el sistema)
export type NoteCreate = Pick<
  Note,
  "title" | "content" | "content_type" | "folder_id"
> &
  Partial<Pick<Note, "color" | "tags" | "pinned">>;

// * Lo que puedes actualizar de una nota
export type NoteUpdate = Partial<
  Pick<
    Note,
    | "title"
    | "content"
    | "content_type"
    | "status"
    | "color"
    | "pinned"
    | "folder_id"
    | "tags"
  >
>;
