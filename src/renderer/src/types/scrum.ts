// * ─────────────────────────────────────────────────────────────────────────────
// * SCRUM — tablero kanban con 3 columnas fijas
// * ─────────────────────────────────────────────────────────────────────────────

import type { BaseEntity, ColorTag } from "./common";

// * Las 3 columnas del método scrum simplificado
export type ScrumColumnId = "todo" | "in_progress" | "done";

// * Metadatos estáticos de cada columna (label, color de header)
export interface ScrumColumn {
  id: ScrumColumnId;
  label: string; // * "Por hacer" | "En desarrollo" | "Hecho"
  color: string; // * color del header de la columna en la UI
}

// * Las columnas definidas — constante, no se persisten en disco 
export const SCRUM_COLUMNS: ScrumColumn[] = [
  { id: "todo", label: "Por hacer", color: "#6b7280" },
  { id: "in_progress", label: "En desarrollo", color: "#3b82f6" },
  { id: "done", label: "Hecho", color: "#22c55e" },
];

// * Nivel de esfuerzo estimado (story points simplificados)
export type ScrumEffort = 1 | 2 | 3 | 5 | 8 | 13; // * Fibonacci clásico

/*
 * Una tarjeta/card del tablero scrum.
 * Más simple que Task: no tiene subtareas, solo checklists opcionales.
 */
export interface ScrumCard extends BaseEntity {
  board_id: string; // * a qué tablero pertenece
  column_id: ScrumColumnId;
  title: string;
  description: string;
  color: ColorTag;
  priority: "low" | "medium" | "high";
  effort: ScrumEffort | null; // * story points, null si no se estima
  due_date: string | null;
  tags: string[];
  checklist: ScrumChecklistItem[]; // * mini-checklist dentro de la tarjeta
  order: number; // * posición dentro de la columna (para drag & drop con @dnd-kit)
  assignee: string | null; // * nombre libre por ahora, luego será un User.id
  completed_at: string | null;
}

// * Ítem de checklist dentro de una ScrumCard
export interface ScrumChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  order: number;
}

/*
 * Tablero scrum. Puedes tener varios tableros:
 * "Sprint 1", "Proyecto Meteor Notes", "Ideas personales", etc.
 */
export interface ScrumBoard extends BaseEntity {
  name: string;
  description: string;
  color: ColorTag;
  archived: boolean;
  sprint_name: string | null; // * ej: "Sprint 3", null si no usas sprints
}

// * Para crear una card (mínimo)
export type ScrumCardCreate = Pick<
  ScrumCard,
  "title" | "board_id" | "column_id"
> &
  Partial<
    Pick<
      ScrumCard,
      | "description"
      | "color"
      | "priority"
      | "effort"
      | "due_date"
      | "tags"
      | "order"
    >
  >;

// * Para actualizar una card
export type ScrumCardUpdate = Partial<
  Pick<
    ScrumCard,
    | "title"
    | "description"
    | "column_id"
    | "color"
    | "priority"
    | "effort"
    | "due_date"
    | "tags"
    | "order"
    | "assignee"
    | "completed_at"
    | "checklist"
  >
>;

// * ─── Helpers de tipo ─────────────────────────────────────────────────────────

/*
 * Estadísticas del tablero calculadas en runtime (no persisten)
 * Útil para mostrar un resumen por columna
 */
export interface ScrumBoardStats {
  board_id: string;
  columns: Record<ScrumColumnId, { count: number; effort_total: number }>;
}
