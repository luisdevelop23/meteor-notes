// * ─────────────────────────────────────────────────────────────────────────────
// * TASK — tareas con subtareas infinitas + grupos
// * ─────────────────────────────────────────────────────────────────────────────

import type { BaseEntity, ColorTag, Status } from "./common";

// * Nivel de prioridad de una tarea
export type TaskPriority = "none" | "low" | "medium" | "high" | "urgent";

/*
 *
 * La entidad central.
 * La clave de la recursividad está en `subtasks: Task[]`.
 * Un componente React puede renderizarse a sí mismo con cada subtarea
 * logrando profundidad infinita sin código extra.
 *
 *  TaskGroup
 *    └── Task
 *          └── subtasks: Task[]
 *                └── subtasks: Task[]
 *                      └── ... ∞
 */

export interface Task extends BaseEntity {
  title: string;
  notes: string; // * observaciones / descripción detallada
  status: Status;
  priority: TaskPriority;
  due_date: string | null; // * ISO 8601, null si no tiene fecha límite
  completed_at: string | null;
  color: ColorTag;
  tags: string[];

  // * Árbol recursivo — vacío [] si es hoja del árbol
  subtasks: Task[];

  // * Metadatos de posición dentro de su grupo/padre
  group_id: string; // * a qué grupo pertenece esta tarea raíz
  parent_task_id: string | null; // * null si es tarea raíz, id del padre si es subtarea
  order: number; // * posición dentro de su lista hermana (para reordenar con drag)
}

/*
 *
 * Agrupa tareas relacionadas.
 * Ej: "Personal", "Trabajo", "Proyecto X"
 */

export interface TaskGroup extends BaseEntity {
  name: string;
  color: ColorTag;
  order: number; // posición en el sidebar de grupos
  collapsed: boolean; // si el grupo está expandido o contraído en la UI
}

/** Para crear una tarea (mínimo requerido) */
export type TaskCreate = Pick<Task, "title" | "group_id" | "parent_task_id"> &
  Partial<
    Pick<Task, "notes" | "priority" | "due_date" | "color" | "tags" | "order">
  >;

/** Para actualizar */
export type TaskUpdate = Partial<
  Pick<
    Task,
    | "title"
    | "notes"
    | "status"
    | "priority"
    | "due_date"
    | "completed_at"
    | "color"
    | "tags"
    | "order"
  >
>;

// ─── Helpers de tipo ─────────────────────────────────────────────────────────

/** Task sin sus subtareas (útil para operaciones flat en storage) */
export type TaskFlat = Omit<Task, "subtasks">;

/**
 * Estadísticas calculadas de un grupo (no se persisten, se computan en runtime)
 * Útil para mostrar "3/8 completadas" en el header del grupo
 */
export interface TaskGroupStats {
  group_id: string;
  total: number;
  completed: number;
  pending: number;
  overdue: number; // tareas con due_date pasada y no completadas
}
